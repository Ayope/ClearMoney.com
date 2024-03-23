FROM node:20.9.0-alpine3.18

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
