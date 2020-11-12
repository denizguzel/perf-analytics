FROM node:12-alpine

WORKDIR /usr/src/app

ARG PORT=3333
ENV PORT=$PORT

COPY ./package.json ./api
COPY ./yarn.lock ./api

RUN yarn

COPY . /usr/src/app

EXPOSE $PORT

CMD ["yarn", "start:api"]
