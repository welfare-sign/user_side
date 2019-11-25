// scp -r ./dist/* root@47.100.29.191:/home/welfare-sign/user_side
const path = require("path");
const node_ssh = require("node-ssh");
const ssh = new node_ssh();

ssh
  .connect({
    host: "47.100.29.191",
    username: "root",
    privateKey: "/Users/lex/.ssh/id_rsa"
  })
  .then(function() {
    // Command
    ssh
      .execCommand("rm -rf /home/welfare-sign/user_side/*")
      .then(function(result) {
        if (result.stderr != "") {
          console.log("STDERR: " + result.stderr);
        } else {
          // Putting entire directories
          ssh
            .putDirectory("./dist", "/home/welfare-sign/user_side", {
              recursive: true,
              concurrency: 10,
              validate: function(itemPath) {
                const baseName = path.basename(itemPath);
                return (
                  baseName.substr(0, 1) !== "." && baseName !== "node_modules" // do not allow dot files and // do not allow node_modules
                );
              },
              tick: function(localPath, remotePath, error) {}
            })
            .then(status => {})
            .catch(e => {});
        }
      });
  })
  .then(() => {
      console.log("done")
  })
