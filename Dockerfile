FROM node:12-alpine
WORKDIR /usr/app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --silent
COPY . .

EXPOSE 3000

# ARG NEXT_PUBLIC_BACKEND_URL
# ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
#
# ARG NEXT_PUBLIC_GOOGLE_MAP_API_KEY
# ENV NEXT_PUBLIC_GOOGLE_MAP_API_KEY=$NEXT_PUBLIC_GOOGLE_MAP_API_KEY

RUN npm run build

CMD npm run start

