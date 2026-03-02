
FROM node:18-slim


RUN apt-get update -y && apt-get install -y openssl libssl-dev

WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .


RUN npx prisma generate

EXPOSE 3000


CMD npx prisma db push && npm start