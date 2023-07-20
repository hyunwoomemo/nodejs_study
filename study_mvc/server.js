const express = require('express');
const usersController = require('./controllers/users.controller');
const postsController = require('./controllers/posts.controller');
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
app.use(express.json());

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

app.get('/users', usersController.getUsers)

app.get('/users/:userId', usersController.getUser)

app.post('/users', usersController.postUser)

app.get('/posts', postsController.getPost)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})