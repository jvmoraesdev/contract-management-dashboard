# Build stage
FROM node:20-alpine

# Create the working directory folder
WORKDIR /app

# Set working environment
ENV NODE_ENV=development

# Copy package files first
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Expose on the Docker external port
EXPOSE 3000

# Run the command to start the server
CMD ["yarn", "dev"]
