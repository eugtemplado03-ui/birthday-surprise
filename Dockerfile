FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose port (default 3456 or environment PORT)
EXPOSE 3456
ENV PORT=3456
ENV NODE_ENV=production

CMD ["node", "server.js"]
