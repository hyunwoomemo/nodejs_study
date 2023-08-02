const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();
const secretText = 'superSecret';

app.use(express.json());

app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // jwt를 이용해서 토큰 생성하기 payload + secretText
  const accessToken = jwt.sign(user, secretText);
  res.json({accessToken})
})

const port = 4000;

app.listen(port, () => {
  console.log('listening' + port)
})