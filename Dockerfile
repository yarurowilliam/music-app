# Use the official Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build -- --configuration production

# Use the official Nginx image to serve the Angular application
FROM nginx:alpine

# Copy the built Angular application from the build stage
COPY --from=build /app/dist/music-app/browser /usr/share/nginx/html

# Create assets directory and set permissions
RUN mkdir -p /usr/share/nginx/html/assets && \
    chown -R nginx:nginx /usr/share/nginx/html

# Copy assets specifically
COPY --from=build /app/src/assets /usr/share/nginx/html/assets

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
