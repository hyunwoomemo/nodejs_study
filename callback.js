// 예시 1
const sum = (a, b, c) => {
  setTimeout(() => {
    c(a + b)
  }, 1000)
};

sum(1, 2, (value) => console.log(value))

// 예시 2

const loadImage = (url, cb) => {
  const imgEl = document.createElement('img');
  imgEl.src = url;
  imgEl.addEventListener('load', () => {
    setTimeout(() => {
      cb(imgEl);
    }, 1000)
  })
}

const container = document.querySelector('.container');
loadImage('https://via.placeholder.com/150x150', imgEl => {
  container.innerHTML = '';
  container.append(imgEl);
})
