FROM node:20-bullseye

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3000

CMD npx prisma db push && node index.js