# Http File Server
[English](README.md) [中文](README_zh.md)

## Introduction
Feature introduction: Written in node.js, it can achieve efficient concurrency and complete operations such as uploading, downloading, and deletion through the curl command.
Warning: No authentication processing is implemented, "Do not use in a production environment!!!!"

## Server Deployment (Ubuntu)
1. Install node.js
```bash
sudo apt-get install -y nodejs
```
2. Clone this repository
```bash
git clone https://github.com/zyeternity/http-file-server.git
cd http-file-server
```
3. Install dependencies
```bash
npm install
```
4. Start the server (the default port is 3000, you can modify the port parameter in index.js to change the port)
```bash
nodjs index.js
```
## Client Operations

+ Linux/MacOS:
  ```bash
  curl -X POST -F "file=@/path/to/file" http://localhost:3000/upload # Upload /path/to/file to the server
  curl http://localhost:3000/list # Get file ID and list
  curl http://localhost:3000/download/${id} -o /path/to/file # Download file to /path/to/file
  curl http://localhost:3000/delete/${id} # Delete cloud file
  ```
+ Windows (curl must be installed):
  ```cmd
  :: Upload /path/to/file to the server
  curl -X POST -F "file=@/path/to/file" http://localhost:3000/upload 
  :: Get file ID and list
  curl http://localhost:3000/list 
  :: Download file to /path/to/file
  curl http://localhost:3000/download/${id} -o /path/to/file 
  :: Delete cloud file
  curl http://localhost:3000/delete/${id} 
  ```