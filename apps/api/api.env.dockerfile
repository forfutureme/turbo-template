FROM node:20 AS base

# 先同步数据库
FROM base AS db
WORKDIR /app

COPY ./package/database/prisma  /app/prisma
COPY ./package/database/src /app/src
COPY ./package/database/package.docker.json /app/package.json

RUN npm install

# 设置环境变量
ARG DATABASE_URL
ENV DATABASE_URL=postgresql://turbo:123456@localhost:5032/turbo_temp?schema=env&connect_timeout=300
# RUN npx prisma migrate dev
RUN npm run db:migrate:deploy
# 更新数据的话，这里执行

# 开始构建
# 先对依赖进行翦除
FROM base AS builder
WORKDIR /app
RUN pnpm global add turbo
COPY . .
RUN turbo prune api --docker

# 建立子工作区
FROM base AS installer
WORKDIR /app

# 安装裁剪后的依赖
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# 基于依赖构建项目
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json

# 设置环境变量
ARG DATABASE_URL
ENV DATABASE_URL=postgresql://turbo:123456@localhost:5032/turbo_temp?schema=env&connect_timeout=300

# 开始构建
RUN pnpm turbo build --filter=api...

# 创建服务
FROM base AS runner
WORKDIR /app

# 不要使用root用户启动服务
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/api/next.config.js .
COPY --from=installer /app/apps/api/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/api/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/api/.next/static ./apps/api/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/api/public ./apps/api/public

CMD node apps/api/server.js