FROM node:14-buster-slim

WORKDIR /app/src

COPY package*.json .


RUN yarn

COPY . .

RUN npx tsc

CMD ["yarn", "start"]