FROM node:20

WORKDIR /app

COPY prisma /app/prisma
COPY src /app/src
COPY package.docker.json /app/package.json


RUN npm install

# 设置环境变量
ARG DATABASE_URL
ENV DATABASE_URL=postgresql://turbo:123456@localhost:5032/turbo_temp?schema=env&connect_timeout=300


# RUN npx prisma migrate dev
RUN npm run db:migrate:deploy

CMD [ "echo", "ok!!!"]