FROM node:18-slim

# Instalamos OpenSSL (vital para Prisma)
RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generamos el cliente para Linux
RUN npx prisma generate

EXPOSE 3000

# EL TRUCO: Esperar 20 segundos antes de tocar la base de datos
CMD sleep 20 && npx prisma db push && npm start