FROM node:12-alpine
WORKDIR /usr/app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --silent
COPY . .
RUN chmod a+x entrypoint.sh

EXPOSE 3000

CMD ["/bin/sh", "entrypoint.sh"]

