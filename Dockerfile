FROM node:latest

ADD . .

# because our certificate isn't trusted
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN npm install && npm install -g typescript ts-node

ENTRYPOINT [ "ts-node", "web.ts" ]

