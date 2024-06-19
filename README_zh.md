# Http File Server
[English](README.md) [中文](README_zh.md)

## 介绍
特点介绍：基于node.js编写，可实现高效率并发，可通过curl命令完成上传、下载、删除等操作。
警告：未实现任何鉴权处理，`请勿用于生产环境！！！！`

## 服务器部署 (Ubuntu)
1. 安装node.js
```bash
sudo apt-get install -y nodejs
```
2. 克隆本仓库
```bash
git clone https://github.com/zyeternity/http-file-server.git
cd http-file-server
```
3. 安装依赖包
```bash
npm install
```
4. 启动服务 (默认端口为3000,可通过修改index.js中的port参数来修改端口)
```bash
nodjs index.js
```
## 客户端操作

+ Linux/MacOS:
  ```bash
  curl -X POST -F "file=@/path/to/file" http://localhost:3000/upload # 上传 /path/to/file 到服务器
  curl http://localhost:3000/list # 获取文件ID和列表
  curl http://localhost:3000/download/${id} -o /path/to/file # 下载文件到 /path/to/file
  curl http://localhost:3000/delete/${id} # 删除云端文件
  ```
+ Windows (需要已安装curl):
  ```cmd
  :: 上传 /path/to/file 到服务器
  curl -X POST -F "file=@/path/to/file" http://localhost:3000/upload 
  :: 获取文件ID和列表
  curl http://localhost:3000/list 
  :: 下载文件到 /path/to/file
  curl http://localhost:3000/download/${id} -o /path/to/file 
  :: 删除云端文件
  curl http://localhost:3000/delete/${id} 
  ```