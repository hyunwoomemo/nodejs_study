const axios = require('axios');

let a = 0;

axios.get('http://naver.com')
  .then((response) => console.log(response));