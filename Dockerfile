# Build stage
FROM node:20-alpine

# Create the working directory folder
WORKDIR /app

# Set working environment
ENV NODE_ENV=development

# Copy the package.json and set up/install project dependencies
COPY package*.json ./
RUN yarn
COPY . ./

# Expose on the Docker external port
EXPOSE 3000

# Run the command to start the server
ENTRYPOINT [ "yarn", "dev" ]
