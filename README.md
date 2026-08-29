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
