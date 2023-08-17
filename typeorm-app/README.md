# typeorm

##

### 설치한 라이브러리

`dependencies`
- express
- morgan (로그를 위한 모듈)
- nodemon
- pg (PostgreSQL 데이터베이스와 인터페이스하기 위한 NodeJS 모듈 모음)
- reflect-metadata (데코레이터를 사용하기 위해 필요한 모듈)
- typeorm

`devDependencies`
- @types/express
- @types/morgan
- @types/node
- ts-node
- typescript

### 코드
1. package.json
```json
"scripts": {
      "dev": "nodemon --exec ts-node ./src/index.ts",
   },
```

2. typescript
```bash
npx tsc --init
```

3. typeorm
```bash
npx typeorm init
```

4. Docker
[Docker 홈페이지](https://www.docker.com/)
- 도커 설치
- docker-compose.yml 파일 작성
- docker-compose up 명령어 터미널에 입력해서 실행

5. pgAdmin 
- 데이터베이스를 보는 툴
- general 탭에서 server name 지정
- connection 탭에서 host(localhost), db, username, pw 입력

6. typeorm CRUD

`Repository` 란
리포지토리는 엔터티 개체와 함께 작동하며 엔터티 찾기, 삽입, 업데이트, 삭제 등을 처리

#### create
```javascript
app.post('/users', async (req, res) => {
  const user = await AppDataSource.getRepository(User).create(req.body);
  console.log(user);
  const results = await AppDataSource.getRepository(User).save(user);
  return res.send(results)
})
```

#### read

- 전체 조회

```javascript
app.get('/users', async (req, res) => {
  const results = await AppDataSource.getRepository(User).find();
  return res.send(results)
})
```

- 단일 아이템 조회

```javascript
app.get('/users/:id', async (req, res) => {
  const results = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id)
  })
  return res.json(results);
})
```

#### update

```javascript
app.put('/users/:id', async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id)
  })
  AppDataSource.getRepository(User).merge(user, req.body);
  const result = await AppDataSource.getRepository(User).save(user)

  return res.send(result);
})
```

#### delete

```javascript
app.delete('/users/:id', async (req, res) => {
  const result = await AppDataSource.getRepository(User).delete(req.params.id);
  res.json(result)
})
```