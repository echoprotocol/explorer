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

FROM nginx:stable

RUN rm -rf /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html
COPY .build/nginx.conf /etc/nginx/nginx.conf

WORKDIR /etc/nginx

CMD ["nginx", "-g", "daemon off;"]
