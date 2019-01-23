# build environment
FROM node:10.15 as builder
WORKDIR /home/frontend
COPY dist /home/frontend
