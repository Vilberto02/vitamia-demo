FROM node:20-alpine3.17

# Instalamos OpenSSL (vital para Prisma)
RUN apt-get update -y && apt-get install -y openssl libssl-dev ca-certificates

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generamos el cliente para Linux
RUN npx prisma generate

EXPOSE 3000

# EL TRUCO: Esperar 20 segundos antes de tocar la base de datos
CMD sleep 20 && npx prisma db push && npm start