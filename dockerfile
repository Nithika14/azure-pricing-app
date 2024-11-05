# Use the official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to make the app accessible
EXPOSE 3000

# Command to start the server
CMD ["npm", "server.js"]
