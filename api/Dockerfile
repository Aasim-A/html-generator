# Use Node LTS as the base image
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and app code
COPY prisma ./prisma
COPY . .

# Generate Prisma client during build
RUN npx prisma db push
RUN npx prisma generate

# Expose API port
EXPOSE 3000

# Use entrypoint script to start the app
CMD ["npm", "run", "dev"]
