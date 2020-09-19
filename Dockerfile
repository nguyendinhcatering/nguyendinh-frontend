FROM node:12-alpine
WORKDIR /usr/app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --silent
COPY . .

EXPOSE 3000

CMD npm run build && npm run start

