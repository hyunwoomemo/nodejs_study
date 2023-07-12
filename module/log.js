const log = {
  info: function (info) {
    console.log('Info ' + info);
  },
  warning: function (warning) {
    console.log('Warning ' + warning);
  },
  error: function (error) {
    console.log('Error ' + error);
  }
}

// 내보낼 모듈 정의
module.exports = log;