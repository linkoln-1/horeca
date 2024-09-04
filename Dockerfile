FROM node:20-alpine

ARG BUILD

WORKDIR /app
COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]
