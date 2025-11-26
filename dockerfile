FROM node:18-alpine AS builder
WORKDIR /app
# Install full deps to allow build step to succeed
COPY package*.json ./
RUN npm ci
COPY . .
# If you have a build step (e.g. bundling/tsc), run it; harmless if not present
RUN npm run build || true

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Install only production deps for smaller image
COPY package*.json ./
RUN npm ci --only=production
# Copy application (including built artifacts from builder)
COPY --from=builder /app ./
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O- http://localhost:3000/ || exit 1
# Default start - adjust if your project uses a different start command
CMD ["npm", "start"]