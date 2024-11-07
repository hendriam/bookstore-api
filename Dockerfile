FROM node:20-alpine

RUN apk add tzdata

RUN ln -sf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]