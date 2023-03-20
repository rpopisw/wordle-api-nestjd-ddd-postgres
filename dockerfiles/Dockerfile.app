# Use an official Node.js runtime as a parent image
FROM node:16.3.0-alpine3.13

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the NODE_ENV environment variable to development
ENV NODE_ENV=development

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the app with nodemon for hot reloading
CMD [ "npm", "run", "start:dev" ]