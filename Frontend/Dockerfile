
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy source code
COPY . .

# Set NODE_ENV
ENV NODE_ENV=production

# Build the app
RUN npm run build

# Verify build output
RUN ls -la build/

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]