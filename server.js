const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.status(200).json({
      data: `Hi from ${process.pid}`,
    });
  });
});

app.listen(3000, () => {
  console.log(`server ${process.pid} started at port 3000`);
});
