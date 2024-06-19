const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Database = require('better-sqlite3');
const fs = require('fs');

const port = 3000;
const host = '0.0.0.0'; // 指定要监听的IP地址


// 打开或创建一个SQLite数据库
const db = new Database('database.db');
// 检查并创建files表
db.prepare('CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)').run();

// 遍历表
function getAllFiles() {
    const stmt = db.prepare('SELECT * FROM files');
    return stmt.all();
}

// 通过id查找name
function getFileNameById(id) {
    const stmt = db.prepare('SELECT name FROM files WHERE id = ?');
    return stmt.get(id);
}

// 删除某个id
function deleteFileById(id) {
    const stmt = db.prepare('DELETE FROM files WHERE id = ?');
    return stmt.run(id).changes;
}

// 添加name并返回id
function addFile(name) {
    const stmt = db.prepare('INSERT INTO files (name) VALUES (?)');
    const result = stmt.run(name);
    return result.lastInsertRowid;
}


app.use(fileUpload());

// 上传文件的接口
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
        status: 'error',
        message: 'No files were uploaded.'
    });
  }

  let uploadedFile = req.files.file;
  let fileId = addFile(uploadedFile.name);
  let uploadPath = __dirname + '/uploads/' + fileId + '.dat';

  console.log(`Uploaded file: ${uploadedFile.name} to ${uploadPath} , id is ${fileId}`);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send({
        status: 'error',
        message: err
      });
    }

    res.send({
        status: 'success',
        message: 'File uploaded successfully',
        fileId: fileId
    });
  });
});
// 获取文件列表的接口
app.get('/list/', (req, res) => {
    let files = getAllFiles();
    res.send(files);
});
// 下载文件的接口
app.get('/download/:id', (req, res) => {
  // 根据文件ID获取文件路径
  let fileId = req.params.id;
  let filename = getFileNameById(fileId); // 假设文件名就是文件ID
  let filePath = __dirname + '/uploads/' + fileId + '.dat';
  // 确保文件名安全，避免路径遍历等安全问题，这里简单示范，实际情况可能需要更复杂的处理
  filename = encodeURIComponent(filename).replace(/%2F/g, '_').replace(/%20/g, ' ');
  // 发送文件作为响应，并指定下载时显示的文件名为filename
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send('File download failed: ' + err);
    }
  });
});
// 删除文件的接口
app.get('/delete/:id', (req, res) => {
  // 根据文件ID获取文件路径
  let fileId = req.params.id;
  let filePath = __dirname + '/uploads/' + fileId + '.dat'; // 假设文件名就是文件ID
  try {
    fs.unlinkSync(filePath);
    deleteFileById(fileId);
    console.log(`File ${fileId} deleted successfully`);
    res.send({
        status: 'success',
        message: `File ${fileId} deleted successfully`
    });
  } catch (err) {
    console.error(`Can delete ${fileId} file:`, err);
    res.status(500).send({
        status: 'error',
        message: `Can delete ${fileId} file: ${err}`
    });
  }
  
});

// 启动服务器
app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`);
  });