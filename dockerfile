FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p ./uploads && chmod -R 777 ./uploads

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "npm", "start" ]