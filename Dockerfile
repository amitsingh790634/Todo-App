

# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install express

# Copy all files to the container
COPY . .

# Expose port
EXPOSE 3000

# Run the Express server
CMD ["node", "server.js"]




