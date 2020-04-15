from node:latest

ADD https://github.com/just-containers/s6-overlay/releases/download/v1.22.1.0/s6-overlay-amd64.tar.gz /tmp/
RUN tar xzf /tmp/s6-overlay-amd64.tar.gz -C /

RUN usermod -u 911 -d /config -l dogen -s /bin/false node
RUN groupmod -g 911 -n dogen node
RUN usermod -G users dogen
RUN mkdir -p /defaults /config /app

RUN apt-get update
RUN apt-get install -y pdftk

COPY express/package.json /app/express/
WORKDIR /app/express
RUN yarn install --silent

COPY react/package.json /app/react/
WORKDIR /app/react
RUN yarn install --silent

ENV REACT_APP_EXPRESS_HOST="localhost:3000"

WORKDIR /app/react
COPY react .

WORKDIR /app/express
COPY express .

COPY rootfs /

ENTRYPOINT ["/init"]

EXPOSE 3000
EXPOSE 5000
VOLUME /app/express/input
