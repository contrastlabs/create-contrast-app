# base

FROM node:lts-alpine AS base

RUN apk add --no-cache bash

# development

FROM base AS development

ENV NODE_ENV development

WORKDIR /usr/src/app

# production

FROM base AS build-production-files

WORKDIR /usr/src/app

COPY ./scripts/wait-for-it.sh tsconfig.json package*.json ./

RUN npm install

COPY src src

RUN npm run build 

FROM base AS install-production-dependencies

WORKDIR /usr/src/app

COPY package*.json ./

COPY src src

RUN npm install --omit=dev

FROM base AS production

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=install-production-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=install-production-dependencies /usr/src/app/package*.json ./
COPY --from=build-production-files /usr/src/app/dist ./dist
COPY --from=build-production-files /usr/src/app/wait-for-it.sh ./wait-for-it.sh

RUN chmod 755 wait-for-it.sh