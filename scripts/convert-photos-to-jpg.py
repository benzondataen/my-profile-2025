"""
Convert every non-JPEG image under gs://<bucket>/<prefix> to JPEG, in place.

For each matching file (e.g. IMG_0331.HEIC, IMG_0273.PNG): downloads it, converts
it to JPEG (baking in EXIF rotation, since iPhone HEIC photos commonly need this),
uploads it as <same-base-name>.jpg - carrying over any custom metadata such as
"description" - then deletes the original object. Files already named .jpg/.jpeg,
and anything that isn't an image, are left untouched. If a .jpg with the target
name already exists, that file is skipped (not overwritten) and reported.

Setup (one time):
    pip install google-cloud-storage pillow pillow-heif
    gcloud auth application-default login
    (this is separate from `gcloud auth login` - the Python SDK needs its own
    Application Default Credentials even if the gcloud CLI is already logged in)

Usage:
    python scripts/convert-photos-to-jpg.py --bucket n8n-short-clip --prefix photos/ --dry-run
    python scripts/convert-photos-to-jpg.py --bucket n8n-short-clip --prefix photos/
"""
import argparse
import io
import sys

from google.cloud import storage
from PIL import Image, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

CONVERTIBLE_EXTENSIONS = {'.png', '.heic', '.heif', '.gif', '.webp', '.bmp', '.tiff', '.tif'}


def convert_to_jpeg_bytes(data: bytes) -> bytes:
    image = Image.open(io.BytesIO(data))
    image = ImageOps.exif_transpose(image)
    if image.mode != 'RGB':
        image = image.convert('RGB')
    buffer = io.BytesIO()
    image.save(buffer, format='JPEG', quality=90)
    return buffer.getvalue()


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--bucket', required=True)
    parser.add_argument('--prefix', default='')
    parser.add_argument('--dry-run', action='store_true', help="Preview what would happen without changing anything")
    args = parser.parse_args()

    client = storage.Client()
    bucket = client.bucket(args.bucket)
    blobs = [b for b in bucket.list_blobs(prefix=args.prefix) if not b.name.endswith('/')]
    existing_names = {b.name for b in blobs}

    to_convert = [b for b in blobs if any(b.name.lower().endswith(ext) for ext in CONVERTIBLE_EXTENSIONS)]
    print(f"Found {len(blobs)} files under '{args.prefix}', {len(to_convert)} need conversion to JPEG.\n")

    converted, skipped, failed = 0, 0, 0
    for blob in to_convert:
        base = blob.name.rsplit('.', 1)[0]
        new_name = f"{base}.jpg"

        if new_name in existing_names:
            print(f"{blob.name}  ->  SKIPPED ({new_name} already exists)\n")
            skipped += 1
            continue

        print(f"{blob.name}  ->  {new_name}")
        if args.dry_run:
            continue

        try:
            original_bytes = blob.download_as_bytes()
            jpeg_bytes = convert_to_jpeg_bytes(original_bytes)

            new_blob = bucket.blob(new_name)
            new_blob.metadata = blob.metadata
            new_blob.upload_from_string(jpeg_bytes, content_type='image/jpeg')

            blob.delete()
            print(f"  done ({len(original_bytes):,} -> {len(jpeg_bytes):,} bytes)\n")
            converted += 1
        except Exception as e:
            print(f"  FAILED: {e}\n", file=sys.stderr)
            failed += 1

    if args.dry_run:
        print("Dry run - nothing was changed. Re-run without --dry-run to apply.")
    else:
        print(f"Done: {converted} converted, {skipped} skipped, {failed} failed.")


if __name__ == '__main__':
    main()
