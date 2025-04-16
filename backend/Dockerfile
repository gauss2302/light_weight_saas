# Use Node.js 18 Alpine as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production=false

# Copy project files
COPY . .

# Expose the application port
EXPOSE ${PORT:-5489}

# Command to start the application
CMD ["node", "app/server.js"]
