# Stage 1: Install dependencies
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies only (without devDependencies for production)
RUN npm ci --production=false

# Stage 2: Run tests
FROM deps AS tester

WORKDIR /app

# Copy source code
COPY . .

# Run tests
RUN npm test -- --coverage --passWithNoTests

# Stage 3: Production build
FROM node:20-alpine AS production

WORKDIR /app

# Set NODE_ENV
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --production=true

# Copy source code
COPY --from=production /app/node_modules ./node_modules
COPY . .

# Create dist directory and compile if needed
RUN mkdir -p dist

# Change ownership to non-root user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "src/server.js"]