const express = require('express');
const cluster = require('cluster');
const crypto = require('crypto');
const os = require('os');
const app = express();

// DO NOT USE, this is just for benchmarking. this will set thread pool size of each child to 1.
process.env.UV_THREADPOOL_SIZE = 1;

const noOfCPUs = os.cpus().length;

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.status(200).json({
      data: `Hi from ${process.pid}`,
    });
  });
});

if (cluster.isMaster) {
  for (let i = 0; i < noOfCPUs; ++i) {
    cluster.fork();
  }

  // on crashing a child, fork another one
  cluster.on('exit', (worker, code, signal) => {
    cluster.fork();
  });
} else {
  app.listen(3000, () => {
    console.log(`server ${process.pid} started at port 3000`);
  });
}
