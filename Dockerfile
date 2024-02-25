FROM node:21-alpine3.19

ENV NODE_VERSION 21.6.2

WORKDIR /usr/app

COPY package*.json ./ 
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]