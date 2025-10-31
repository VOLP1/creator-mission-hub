# Estágio 1: Build (Instalar dependências e compilar o TS)
FROM node:20-alpine AS builder
WORKDIR /app

# Copia 'package.json' e 'package-lock.json'
COPY package*.json ./

# Instala TODAS as dependências (incluindo devDeps para 'typescript')
RUN npm install

# Copia todo o resto do código-fonte
COPY . .

# Roda o script de build do servidor que criamos
RUN npm run build:server

# Estágio 2: Produção (Apenas o código rodando)
FROM node:20-alpine AS production
WORKDIR /app

# Copia as dependências de produção do estágio de build
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Copia o JavaScript compilado (da pasta 'dist')
COPY --from=builder /app/dist ./dist

# Expõe a porta que o 'app.listen' usa
EXPOSE 4000 

# O comando para iniciar o servidor
CMD [ "node", "dist/server.js" ]
