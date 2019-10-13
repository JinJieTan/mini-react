const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../')));

app.listen(1234, err => {
  if (!err) {
    console.log('监听成功，端口号1234');
  } else {
    console.log(err);
  }
});
