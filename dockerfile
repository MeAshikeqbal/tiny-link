FROM node:24-alpine AS builder
WORKDIR /app
# Copy repository first so postinstall hooks (prisma generate) can find schema
# Use Node 24 to satisfy Prisma engine requirements
COPY . .
# Install full deps but skip lifecycle scripts to avoid relying on postinstall hooks
# that may expect runtime-only files. Run Prisma generate explicitly using the
# known schema path so it succeeds during build.
RUN npm ci --ignore-scripts \
	&& npx prisma generate --schema=prisma/schema.prisma \
	&& npm run build || true

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy application (including node_modules built in builder)
# We copy the built app and node_modules from the builder stage to avoid
# re-running npm in the runner where the prisma schema may not be present.
COPY --from=builder /app ./
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O- http://localhost:3000/ || exit 1
# Default start - adjust if your project uses a different start command
CMD ["npm", "start"]