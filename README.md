# Koa React blog



# 运行项目

开发模式下可以直接 `npm run dev`

# 发布博客文章

博客文章采用markdown文档编写

1. 将文档添加到 `posts` 目录下

2. cd `PROJECT_DIR/bin` and run `python dumpPosts.py`

# 部署项目

1. 打包项目

	npm run build:server
	npm run build:client

项目将会打包到 site 目录下

2.运行

cd `PROJECT_DIR/bin` 

运行 `bash eckidblog.sh start`
停止 `bash eckidblog.sh stop`