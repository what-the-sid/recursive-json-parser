FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER root

COPY --chown=node:node . .

RUN npm install
RUN npm install
COPY . .
RUN npm run test
RUN npm run lint

EXPOSE 5000
CMD [ "node", "index.js" ]
