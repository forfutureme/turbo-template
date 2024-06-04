FROM node:20 AS base

# 定义公共变量
ARG appname=frontend
ARG registryurl=https://registry.npmmirror.com
# 开始构建
# 先对依赖进行翦除
FROM base AS builder
WORKDIR /app
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm --registry ${registryurl}  any-touch
RUN pnpm add turbo -g --registry ${registryurl} any-touch
COPY . .
RUN turbo prune ${appname} --docker

# 建立子工作区
FROM base AS installer
WORKDIR /app
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm --registry ${registryurl} any-touch
# 安装裁剪后的依赖
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --registry ${registryurl} any-touch -w

# 基于依赖构建项目
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json

# 设置环境变量
ARG DATABASE_URL
# 这里是build阶段，网络使用的是host模式，相当于通过主机连接数据库容器，所以使用localhost+容器对外端口
ENV DATABASE_URL=postgresql://turbo:123456@localhost:5032/turbo_temp?schema=env&connect_timeout=300

# 禁用next.js在构建时收集数据
ENV NEXT_TELEMETRY_DISABLED 1

# 处理数据库
# 初始化prisma
RUN pnpm turbo db:generate

# 开始构建
RUN pnpm turbo build --filter=${appname}...

#更新数据库
RUN pnpm turbo db:migrate:deploy

# 创建服务
FROM base AS runner
WORKDIR /app

# 不要使用root用户启动服务
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/${appname}/next.config.js .
COPY --from=installer /app/apps/${appname}/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/${appname}/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/${appname}/.next/static ./apps/${appname}/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/${appname}/public ./apps/${appname}/public

# 设置环境变量
ARG DATABASE_URL
# 此时在容器内部启动服务 连接数据库时需要使用 数据库容器名+容器内数据库服务端口号
ENV DATABASE_URL=postgresql://turbo:123456@postgres:5432/turbo_temp?schema=env&connect_timeout=300

CMD node apps/${appname}/server.js
