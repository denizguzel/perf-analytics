FROM node:12-alpine as builder

WORKDIR /client

COPY ./package.json ./client
COPY ./yarn.lock ./client

RUN yarn

COPY . /client

RUN yarn build:web

FROM nginx:1.16.0-alpine

COPY --from=builder /client/dist/apps/perf-analytics /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
