
class User {
  constructor() {
    this.firstName = '조'
    this.lastName = '은비'
    return {
      firstName: '이',
      lastName: '현우',
      age: 85,
      getFullName: function () {
        return `${this.firstName} ${this.lastName}` // 이 현우
      },
      getFullName: () => `${this.firstName} ${this.lastName}` // 조 은비
    }
  }
}

const u = new User()

console.log(u.getFullName())