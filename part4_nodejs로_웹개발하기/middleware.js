const express = require('express');

const PORT = 4000;

const Users = [
  {
    id: 0,
    name: 'Hyun',
  },
  {
    id: 1,
    name: 'Kim',
  }
]

const app = express();

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`)
  next()

  const diffTime = Date.now() - start;
  console.log(`${req.method} ${req.url} ${diffTime}ms`)
})

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/users', (req, res) => { 
  res.send(Users)
})

app.get('/users/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const user = Users[userId];

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})