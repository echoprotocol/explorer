FROM node:12-alpine as builder

WORKDIR /app
RUN apk --no-cache add g++ gcc git libgcc libstdc++ linux-headers make python3 alpine-sdk ffmpeg

ARG NODE_APP_INSTANCE=""
ENV NODE_APP_INSTANCE=${NODE_APP_INSTANCE}


ENV NODE_ENV="production"
COPY package.json ./
RUN NODE_ENV=development npm install

COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
