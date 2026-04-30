# Estágio 1: Build do frontend
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:frontend

# Estágio 2: Servir com Nginx
FROM nginx:alpine

# Config do Nginx para SPA (redireciona tudo para index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos do build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
