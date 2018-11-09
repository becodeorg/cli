FROM node:alpine

WORKDIR /src/app

EXPOSE 12345

RUN apk update && apk upgrade \
	&& apk add --no-cache git \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install -g nodemon node-gyp node-pre-gyp

CMD ["npm", "start"]
