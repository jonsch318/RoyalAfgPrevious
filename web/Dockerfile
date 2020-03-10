FROM node:13.8.0-alpine as build
WORKDIR /usr/src/app
COPY package.json yarn.lock  ./
RUN yarn install

COPY ./ .
RUN yarn run build

FROM nginx:1.17.8-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY angularapp.conf ./etc/nginx/conf.d/
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
EXPOSE 8080