# Estágio 1: Build (frontend + backend)
FROM node:20-alpine AS builder
WORKDIR /app

# Copia 'package.json' e 'package-lock.json'
COPY package*.json ./

# Instala TODAS as dependências (incluindo devDeps para build)
RUN npm install

# Copia todo o resto do código-fonte
COPY . .

# Build completo: frontend (Vite → dist/client) + backend (TSC → dist/)
RUN npm run build

# Estágio 2: Produção
FROM node:20-alpine AS production
WORKDIR /app

# Copia as dependências de produção do estágio de build
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# Copia o build inteiro (server + client estático)
COPY --from=builder /app/dist ./dist

# Porta padrão (Coolify normalmente usa 3000)
EXPOSE 3000

# Health check para o Coolify saber que o app está vivo
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/v1/manifesto/signatures || exit 1

# Inicia o servidor
CMD [ "node", "dist/server.js" ]
