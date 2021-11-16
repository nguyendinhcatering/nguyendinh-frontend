FROM node:12-alpine
WORKDIR /usr/app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
COPY . .

EXPOSE 3000

# Define variables
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

RUN yarn build

CMD yarn start

