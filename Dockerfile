FROM node

MAINTAINER Genar <genar@acs.li>

COPY . /app
WORKDIR /app

RUN npm install

ENV NODE_ENV production

ENTRYPOINT node app.js
