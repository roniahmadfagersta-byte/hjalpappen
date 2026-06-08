FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Development
FROM base AS development
CMD ["npm", "run", "dev"]

# Build
FROM base AS build
RUN npm run build

# Production
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
