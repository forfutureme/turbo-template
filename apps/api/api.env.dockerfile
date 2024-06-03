FROM node:20 AS base

# 先同步数据库
# FROM base AS db
# WORKDIR /app

# COPY ./package/database/prisma  /app/prisma
# COPY ./package/database/src /app/src
# COPY ./package/database/package.docker.json /app/package.json

# RUN npm install --registry https://registry.npmmirror.com any-touch

# # 设置环境变量
# ARG DATABASE_URL
# ENV DATABASE_URL=postgresql://turbo:123456@localhost:5032/turbo_temp?schema=env&connect_timeout=300
# # RUN npx prisma migrate dev
# RUN npm run db:migrate:deploy
# 更新数据的话，这里执行

# 开始构建
# 先对依赖进行翦除
FROM base AS builder
WORKDIR /app
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm --registry https://registry.npmmirror.com  any-touch
RUN pnpm add turbo -g --registry https://registry.npmmirror.com any-touch
COPY . .
RUN turbo prune api --docker

# 建立子工作区
FROM base AS installer
WORKDIR /app
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm --registry https://registry.npmmirror.com any-touch
# 安装裁剪后的依赖
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --registry https://registry.npmmirror.com any-touch -w

# 基于依赖构建项目
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json

# 设置环境变量
ARG DATABASE_URL
ENV DATABASE_URL=postgresql://turbo:123456@localhost:5032/turbo_temp?schema=env&connect_timeout=300

# 禁用next.js在构建时收集数据
ENV NEXT_TELEMETRY_DISABLED 1

# 处理数据库
# 初始化prisma
RUN pnpm turbo db:generate

# 开始构建
RUN pnpm turbo build --filter=api...

#更新数据库
RUN pnpm turbo db:migrate:deploy

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

# 设置环境变量
ARG DATABASE_URL
ENV DATABASE_URL=postgresql://turbo:123456@postgres:5432/turbo_temp?schema=env&connect_timeout=300

CMD node apps/api/server.js

# USER root