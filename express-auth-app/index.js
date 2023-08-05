const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();
const secretText = 'superSecret';
const refreshSecretText = 'refreshSecret'

const posts = [
  {
  username: 'John',
    title: 'Post 1',
  },
  {
  username: 'Hyun',
    title: 'Post 2',
  },
]

let refreshTokens = []

app.use(express.json());
app.use(cookieParser());


app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // jwt를 이용해서 토큰 생성하기 payload + secretText
  // 유효기간 추가
  const accessToken = jwt.sign(user, secretText, { expiresIn: '30s' });
  
  // jwt를 이용해서 refreshToken도 생성
  const refreshToken = jwt.sign(user, refreshSecretText, { expiresIn: '1d' });

  // 보통 refreshToken은 데이터베이스에 저장한다고 한다.
  refreshTokens.push(refreshToken)

  // refreshToken을 쿠키에 넣어주기
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  })

  res.json({accessToken})
})

app.get('/posts', authMiddleware, (req, res) => {
  res.json(posts)
})

function authMiddleware(req, res, next) {
  // request header안에 authorizatipn에 token이 있음
  const authHeader = req.headers['authorization'];
  // 보통 token은 'Bearer ~~~~'로 되어있기 때문에 공백을 기준으로 split 메서드를 사용. 배열의 인덱스값 1이 token을 의미
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.sendStatus(401)

  jwt.verify(token, secretText, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.get('/refresh', (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401); 

  const refreshToken = cookies.jwt
  // refreshToken이 데이터베이스에 있는 토큰인지 확인 (여기서는 배열을 확인)
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403)
  }

  // 토큰이 유효한 토큰인지 확인
  jwt.verify(refreshToken, refreshSecretText, (err, user) => {
    if (err) return res.sendStatus(403)
    // accessToken을 생성
    const accessToken = jwt.sign({ name: user.name }, secretText, { expiresIn: '30s' })
    
    res.json({accessToken})
  })

})

const port = 4000;

app.listen(port, () => {
  console.log('listening' + port)
})