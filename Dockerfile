FROM node:20 as builder

RUN npm i -g pnpm@9.15.1

ADD ./ /app
WORKDIR /app

RUN pnpm i
RUN pnpm build


FROM node:20-slim

RUN mkdir /app
COPY --from=builder /app/.output /app/
WORKDIR /app

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "/app/server/index.mjs"]
