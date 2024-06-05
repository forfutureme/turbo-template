# 项目简介
> 这是综合性项目模版：
> * 基于`turbo`管理`monorepo`项目，
> * 使用`nextjs`作为全栈应用框架，
> * 使用`tailwindcss`做为样式库，
> * 使用`postgresSql`做为持久数据库，
> * 使用`redis`做为快速读写的内存数据库
> * 使用`prisma`做为数据库的ORM工具
> * 使用`typescript`做为`javascript`的类型超集
> * 使用`docker`做为容器部署工具

## 模版内置的公共能力(packages)
* `eslint-cofonfig` - `eslint`公共配置
* `typescript-config` - `typescript`公共配置
* `prettier-config` - `prettier`公共配置
* `tailwind-config` - `tailwind`公共配置
* `database` - `prisma`工具初始化并对外输出
* `ui` - 公共UI组件库

## 模版内演示应用
* `api` - 一个只提功能接口服务的应用
* `backend` - 管理端应用
* `frontend` - 用户端应用


## 启动本地开发

### 包管理器准备，依赖安装
* 推荐使用`pnpm`可以配合`--filter=xxx`方便针对性安装依赖
```sh
npm i pnpm -g
```
* 安装`turbo`
```sh
pnpm add turbo -g
```
* 安装依赖
```sh
pnpm i -w
```

### 数据库准备
* 确保数据库在本地已准备好
  * 本地启动`redis`  (可选，目前演示功能未使用)
  * 本地启动`postgersSql`

* 修改`packages/database/.env`文件里，数据库连接时使用的必要信息

#### 启动本地环境

* 启动全部应用
```sh
turbo run dev
```
* 启动单个应用
```sh
turbo run db:generate
turbo run db:migrate:dev:init
turbo run dev --filter=xxx
```


## 容器化部署
> 建议在服务器环境进行

### 构建镜像
```sh
docker compose -f ./docker-compose.env.yml build
```

### 容器部署
```sh
docker compose -f ./docker-compose.env.yml up -d
```

### 查看部署状态
```sh
docker ps
```

### 查看目标应用日志
```sh
docker logs 容器名｜容器id
```
