const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const User = require('./models/user.model')
const passport = require('passport')
const cookieSession = require('cookie-session')

const config = require('config')
const mainRouter = require('./routes/main.router')
const serverConfig = config.get('server');

const usersRouter = require('./routes/users.router')

const port = serverConfig.port;

require('dotenv').config()

app.use(cookieSession({
  name: 'cookie-session-name',
  keys: [process.env.COOKIE_ENCRYPTION_KEY]
}))

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb()
    }
  }

  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb()
    }
  }
  next()
})

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')

app.use(express.json())
// form안에 내용을 파싱해서 가져오기 위해 아래 코드 추가
// x-www-form-urlencoded형태의 데이터
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('mongoDB connected')
  })
  .catch((err) => {
    console.log(err)
  })

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', mainRouter);
app.use('/auth', usersRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})