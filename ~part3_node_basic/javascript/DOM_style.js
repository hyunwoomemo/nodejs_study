const el = document.querySelector('.child');

// 개별 지정!
// el.style.backgroundColor ='red';
// el.style.color = 'blue';
// el.style.fontSize = '20px';
// el.style.padding = '10px';
// el.style.margin = '10px';
// el.style.borderRadius = '5px';

// 한 번에 지정!
Object.assign(el.style, {
  backgroundColor:'red',
    color: 'blue',
    fontSize: '20px',
    padding: '10px',
    margin: '10px',
})