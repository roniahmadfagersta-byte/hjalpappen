FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Development
FROM base AS development
CMD ["npm", "run", "start:dev"]

# Build
FROM base AS build
RUN npm run build

# Production
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "dist/main.js"]
