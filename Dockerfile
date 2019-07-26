# build environment
FROM node:10.15.3-alpine as builder

ARG NODE_APP_INSTANCE="production"

ENV NODE_ENV="production"
ENV NODE_APP_INSTANCE=$NODE_APP_INSTANCE

WORKDIR /app/
COPY . /app

RUN apk add git python
RUN git config --global http.sslverify "false"
RUN NODE_ENV=development npm install
RUN npm run build

FROM node:10.15-alpine

WORKDIR /app

ENV NODE_ENV="production"
ENV NODE_APP_INSTANCE=$NODE_APP_INSTANCE

COPY --from=builder /app/dist /app/dist
COPY ./server.js /app/
COPY ./config /app/config
COPY ./package.json /app/package.json

RUN NODE_ENV=development npm install

CMD ["node", "server.js"]
