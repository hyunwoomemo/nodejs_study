const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const User = require('./models/user.model')
const passport = require('passport')
const cookieSession = require('cookie-session')

const cookieEncryptionKey = 'superSecret'

app.use(cookieSession({
  name: 'cookie-session-name',
  keys: [cookieEncryptionKey]
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

mongoose.connect(`mongodb+srv://hyunwoomemo:qlalf1324@ayaan.0aerlae.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('mongoDB connected')
  })
  .catch((err) => {
    console.log(err)
  })

// app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', (req, res, next) => {
  console.log('1')
  passport.authenticate('local', (err, user, info) => {
    console.log('2')
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ msg: info });
    }

    req.login(user, function (err) {
      if (err) { return next(err); }
      res.redirect('/')
    })
  })(req, res, next)
})

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/signup', async (req, res, next) => {
  // user 객체를 생성
  const user = new User(req.body)
  try {
    // user 컬렉션에 유저를 저장
    await user.save();
    return res.status(200).json({ success: true})
  }
  catch (err) {
    console.error(err)
  }
})


const port = 4000;

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})