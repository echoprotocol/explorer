# build environment
FROM node:8.9.4-alpine as builder
WORKDIR /home/frontend
COPY dist /home/frontend
