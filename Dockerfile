from node:latest

RUN apt-get update
RUN apt-get install -y pdftk

WORKDIR /covid/server
COPY express/package.json ./
RUN yarn install --silent
COPY express .
EXPOSE 3000

WORKDIR /covid/client
COPY react/package.json ./
RUN yarn install --silent
COPY react .
RUN yarn build
EXPOSE 5000

WORKDIR /covid
COPY docker/init.sh .

ENTRYPOINT ["/covid/init.sh"]

VOLUME /covid/server/input