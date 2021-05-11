FROM node:12.21-alpine
LABEL Author="Duong Duc Nam <nampt1999@gmail.com>"

EXPOSE 3000
RUN apk add yarn
RUN npm i -g @nestjs/cli --silent

WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --silent

COPY . .
RUN yarn run build
RUN rm -r src

CMD yarn run start:prod