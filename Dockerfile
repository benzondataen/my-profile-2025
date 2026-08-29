# Stage 1: Build the React application (client + SSR server bundles)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build
COPY . .

# Vite bakes VITE_-prefixed vars into the client bundle at BUILD time, not runtime -
# it must be passed as a build arg, not a regular Cloud Run env var.
ARG VITE_YOUTUBE_API_KEY
ENV VITE_YOUTUBE_API_KEY=$VITE_YOUTUBE_API_KEY

RUN npm run build

# Stage 2: Run the SSR server
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies (express, react, react-dom, etc.)
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built client/server bundles and the server entrypoint
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js

# Cloud Run injects PORT; server.js reads it via process.env.PORT
CMD ["node", "server.js"]
