# Build Stage
FROM node:18.18.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Deploy Stage
FROM nginx:alpine
COPY --from=node /app/dist/qfin-frontend /usr/share/nginx/html