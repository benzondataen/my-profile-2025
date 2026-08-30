<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/18lXVCTs64fQwRlwbGTsa7IxEnj0RJ0Vx

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Google Cloud Run

This project includes a `Dockerfile` optimized for deploying the React application using [Google Cloud Run](https://cloud.google.com/run).

**Prerequisites:**
- [Google Cloud CLI (`gcloud`)](https://cloud.google.com/sdk/docs/install) installed.
- A Google Cloud Project with billing enabled.

### 0. Setup Google Cloud CLI

Before deploying, authenticate with your Google account and select your project:

```bash
# Login to your Google Cloud account
gcloud auth login

# Set your active project
gcloud config set project YOUR_PROJECT_ID
```

### 1. Fast Deploy (Direct from source)

You can build and deploy in a single command without needing Docker installed locally:

```powershell
gcloud run deploy my-profile-web `
  --source . `
  --region asia-southeast1 `
  --allow-unauthenticated
```
*(This command uploads your code to Cloud Build, builds the container image, and deploys it to Cloud Run automatically).*

### 2. Manual Build (via Cloud Build) and Deploy

If you prefer to separate the build and deploy steps, you can use Cloud Build to build the image remotely:

1. **Create a staging bucket for source code (only needed once):**
   *(This prevents "forbidden" errors if the default bucket name is taken)*
   ```powershell
   gcloud storage buckets create gs://YOUR_PROJECT_ID-build-src --location=asia-southeast1
   ```
2. **Build the image on Cloud Build with Environment Variables:**
   ```powershell
   gcloud builds submit --config cloudbuild.yaml `
     --substitutions=_VITE_YOUTUBE_API_KEY="your_youtube_api_key_here" `
     --gcs-source-staging-dir=gs://YOUR_PROJECT_ID-build-src/source .
   ```
3. **Deploy the built image to Cloud Run:**
   ```powershell
   gcloud run deploy my-profile-web `
     --image gcr.io/YOUR_PROJECT_ID/my-profile-web `
     --region asia-southeast1 `
     --allow-unauthenticated
   ```

### Notes on Environment Variables

If your application requires environment variables (like `GEMINI_API_KEY`) to be available at build time (e.g., for Vite, typically prefixed with `VITE_`), you can pass them as arguments during the build or deploy process.

For `gcloud run deploy --source .`, you can use `--build-env-vars`:
```powershell
gcloud run deploy my-profile-web `
  --source . `
  --region asia-southeast1 `
  --allow-unauthenticated `
  --build-env-vars="VITE_GEMINI_API_KEY=your_api_key_here"
```

## Managing Gallery Photos & CV (No Redeploy Needed)

Gallery photos and the CV are not part of the codebase - they're read at runtime from the
public GCS bucket `n8n-short-clip`, so adding, replacing, or removing them only requires
uploading to the bucket. No code change or redeploy needed.

**Folder layout:**
- Gallery photos: `photos/<year>/<file>` (e.g. `photos/2024/IMG_1234.jpg`) - the folder name
  becomes the year filter shown on the site.
- CV: `MY_CV/<file>.pdf` - the site always downloads whichever file was uploaded most
  recently in that folder, regardless of filename.

**Captioning a photo:** set a custom metadata key named `description` on the object (exact
lowercase spelling) to caption it on hover and in the full-screen viewer. Without one, the
photo still shows, just with no caption.
```bash
gsutil setmeta -h "x-goog-meta-description:your caption here" gs://n8n-short-clip/photos/2024/IMG_1234.jpg
```

**Supported photo formats:** `.jpg`/`.jpeg`, `.png`, `.gif`, `.webp`, `.avif`, and
`.heic`/`.heif` (iPhone's default format). HEIC/HEIF photos are converted to JPEG in the
visitor's browser on the fly, since most browsers can't display them natively - this works,
but adds a one-time ~340KB download and a short decode delay per HEIC photo. If you have a
batch of HEIC (or PNG/GIF/etc.) photos already uploaded, `scripts/convert-photos-to-jpg.py`
converts them to JPEG in place directly in the bucket (same filename, `.jpg` extension,
custom metadata preserved), so visitors never pay that conversion cost:

```bash
pip install google-cloud-storage pillow pillow-heif
gcloud auth application-default login   # separate from `gcloud auth login` - the Python SDK needs its own credentials

# Preview what would change, without touching anything:
python scripts/convert-photos-to-jpg.py --bucket n8n-short-clip --prefix photos/ --dry-run

# Then run for real:
python scripts/convert-photos-to-jpg.py --bucket n8n-short-clip --prefix photos/
```

**Bucket requirements** (already set up on `n8n-short-clip`, only relevant if moving to a
new bucket): `allUsers` needs `Storage Object Viewer` for public read/list access, and CORS
must allow `GET` from the site's origin for the HEIC conversion above to fetch raw bytes:
```bash
cat > cors.json <<'EOF'
[{"origin": ["https://benz.sengsalee.dev", "http://localhost:3000"], "method": ["GET"], "responseHeader": ["Content-Type"], "maxAgeSeconds": 3600}]
EOF
gcloud storage buckets update gs://n8n-short-clip --cors-file=cors.json
```
