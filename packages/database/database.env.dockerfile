FROM node:20

WORKDIR /app 

COPY prisma /app/prisma
COPY src /app/src
COPY package.docker.json /app/package.json



# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
#   # Allow install without lockfile, so example works even without Node.js installed locally
#   else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
#   fi
RUN npm install

# 设置环境变量
ARG DATABASE_URL
ENV DATABASE_URL=postgresql://turbo:123456@localhost:5032/turbo_temp?schema=env&connect_timeout=300


# RUN npx prisma migrate dev

CMD [ "npx", "prisma", "migrate", "deploy" ]