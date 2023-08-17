# sequelize

##

### 설치한 라이브러리

`dependencies`
- express
- nodemon
- pg (PostgreSQL 데이터베이스와 인터페이스하기 위한 NodeJS 모듈 모음)
- pg-hstore
- sequelize

### 코드
1. package.json
```json
"scripts": {
      "dev": "nodemon --exec ts-node ./src/index.ts",
   },
```

2. Docker
[Docker 홈페이지](https://www.docker.com/)
- 도커 설치
- docker-compose.yml 파일 작성
- docker-compose up 명령어 터미널에 입력해서 실행

3. Sequelize
- src 폴더 안에 models 폴더 생성
- models 폴더에 `index.js`와 `user.model.js` 파일 생성

#### src/models/index.js
```javascript
const Sequelize = require('sequelize');

const dbConfig = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "password",
  PORT: "5432",
  DB: "postgres",
  dialect: "postgres",
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./user.model.js')(sequelize, Sequelize)
```

#### src/models/user.modle.js
```javascript
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    hasCar: {
      type: Sequelize.BOOLEAN
    }
  })
}
```

- pgAdmin에 database sync 맞추기

```javascript
db.sequelize.sync({ force: true }).then(() => {
  console.log('데이터베이스 drop 및 sync를 다시 맞춤')
})
```

4. Sequelize CRUD

#### create
```javascript
app.post('/users', (req, res) => {
  const { firstName, lastName, hasCar } = req.body;

  const user = {
    firstName,
    lastName,
    hasCar
  }

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || '유저를 생성하는데 에러가 발생했습니다.'
      })
    })
})
```

#### read
- 전체 조회
```javascript
app.get('/users', (req, res) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || '유저 정보를 가져오는데 실패했습니다.'
      })
    })
})
```

- 단일 아이템 조회
```javascript
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({
          message: `id가 ${id}인 유저가 없습니다.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `${id}인 유저를 찾는데 에러가 발생했습니다.`
      })
    })
})
```

#### update
```javascript
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: {id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating User with id=' + id
      })
    })
})
```

#### delete
```javascript
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: {id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: '유저가 성공적으로 삭제되었습니다.'
        })
      } else {
        res.send({
          message: `${id} 유저를 찾지 못했습니다.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `${id} 유저를 삭제하는데 실패했습니다.`
      })
    })
})
```