# Build Stage
FROM node:18.18.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Deploy Stage
FROM --platform=linux/arm64 nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/qfin-frontend /usr/share/nginx/html