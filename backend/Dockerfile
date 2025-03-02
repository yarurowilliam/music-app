# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Then copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Node.js application
CMD ["node", "server.js"]
