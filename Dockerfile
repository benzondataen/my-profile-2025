# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build
COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

WORKDIR /app

# Install 'serve' to run the application
RUN npm install -g serve

# Copy the built assets from the builder stage
COPY --from=builder /app/dist ./dist

# Run 'serve' on the port specified by Cloud Run
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
