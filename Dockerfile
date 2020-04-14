from node:latest

RUN apt-get update
RUN apt-get install -y pdftk

WORKDIR /covid/server
COPY express/package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]