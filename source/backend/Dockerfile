FROM node:20-bullseye

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD npx prisma generate && npx prisma db push && node index.js