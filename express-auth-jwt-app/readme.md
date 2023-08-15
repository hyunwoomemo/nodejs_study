# jwt를 이용한 로그인앱 구현

## jwt 사용

### 설치한 라이브러리

`cookie-parser`, `express`, `jsonwebtoken`, `nodemon`

- 로그인할 때 accessToken과 refreshToken 생성해서 각각 로컬스토리지와 쿠키에 저장
- 특정 서비스에 접속할 때 토큰을 인증하는 authMiddleware 정의
- 액세스 토큰 만료시 리프레시 토큰이 유효한지 확인하고 유효하다면 액세스 토큰을 생성

> 실제 프로젝트 적용 사례에 대해서 고민하고 적용해보는 것이 필요할 것 같다.