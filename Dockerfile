FROM node:current-alpine3.11

# Setting working directory
WORKDIR /home/node/app

# Installing node dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

CMD yarn start