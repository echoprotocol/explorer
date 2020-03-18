FROM node:10.15-alpine as builder

WORKDIR /app
RUN apk --no-cache add g++ gcc git libgcc libstdc++ linux-headers make python alpine-sdk ffmpeg

ENV NODE_ENV="production"
COPY package.json ./
RUN NODE_ENV=development npm install

COPY . .
RUN npm run build
CMD ["node", "server.js"]
