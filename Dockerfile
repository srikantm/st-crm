# Use an official Node.js image as a base
FROM node:18-alpine AS base

# Set environment variable to tell Next.js to run in production mode
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy your package.json and pnpm-lock.yaml first to take advantage of Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Build the Next.js app
RUN pnpm build

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["pnpm", "start"]
