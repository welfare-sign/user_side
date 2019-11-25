const archiver = require('archiver');
const fs = require('fs');
const node_ssh = require('node-ssh');
const ssh = new node_ssh();
const srcPath = "./dist"

console.log('开始压缩dist目录...');
startZip();

//压缩dist目录为dist.zip
function startZip() {
   var archive = archiver('zip', {
       zlib: { level: 5 } //递归扫描最多5层
   }).on('error', function(err) {
       throw err;//压缩过程中如果有错误则抛出
   });

   var output = fs.createWriteStream(__dirname + '/dist.zip')
    .on('close', function(err) {
        /*压缩结束时会触发close事件，然后才能开始上传，
          否则会上传一个内容不全且无法使用的zip包*/
        if (err) {
           console.log('关闭archiver异常:',err);
           return;
        }
        console.log('已生成zip包');
        console.log('开始上传zip文件至远程机器...');
        delRemoteFile();
    });

   archive.pipe(output);//典型的node流用法
   archive.directory(srcPath,'/user_side');//将srcPach路径对应的内容添加到zip包中/dist
   archive.finalize();
}

function delRemoteFile() {
    ssh.connect({
        host: "47.100.29.191",
        username: "root",
        privateKey: "/Users/lex/.ssh/id_rsa"
       }).then(function () {
            ssh.execCommand("cd /home/welfare-sign && rm -rf dist.zip user_side").then(function(result) {
                if (!result.stderr){
                    uploadFile()
                }
            })
       }).catch(err=>{
            console.log('ssh连接失败:',err);
            process.exit(0);
        });
}

//将dist目录上传至正式环境
function uploadFile() {
    ssh.putFile("./dist.zip", "/home/welfare-sign/dist.zip").then(function(status) {
        console.log('上传文件成功');
        console.log('开始解压文件');
        unzipRemoteFile();
  }).catch(err=>{
     console.log('文件传输异常:',err);
     process.exit(0);
  });
}

//解压文件
function unzipRemoteFile() {
   ssh.execCommand('cd /home/welfare-sign && unzip dist.zip').then(function(result) {
       console.log('远程STDOUT输出: ' + result.stdout)
       console.log('远程STDERR输出: ' + result.stderr)
       if (!result.stderr){
           console.log('发布成功!');
           process.exit(0);
       }
   });
}
