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


