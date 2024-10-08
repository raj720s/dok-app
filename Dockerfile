# Stage 1: Build the Node.js app
FROM node:alpine3.18 as build

# Environment variable
ARG REACT_APP_BASE_URL
# Set environment variable
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

# Build process
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Set up NGINX to serve the built app
FROM nginx:1.23-alpine

# Set the working directory to NGINX's default HTML directory
WORKDIR /usr/share/nginx/html

# Remove default NGINX static files
RUN rm -rf ./*

# Copy built app from the build stage to the NGINX directory
COPY --from=build /app/build .

# Expose port 80 for HTTP
EXPOSE 80

# Start NGINX in the foreground (needed for container)
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
