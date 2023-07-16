const http = require('http');
const server = http.createServer((req, res) => {
  const targetObject = { a: 'A', b: "B" };
  if (req.method === 'POST' && req.url === '/home') {
    req.on('data', (data) => {
      console.log(data);
      const stringfiedData = data.toString();
      console.log(stringfiedData);
      Object.assign(targetObject, JSON.parse(stringfiedData));
      console.log(targetObject)
    })
  } else {
    if (req.url === '/home') {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(targetObject));
    } else if (req.url === '/about') { 
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<body>');
      res.write('<h1>About Page</h1>');
      res.write('</body>');
      res.write('</html>');
    } else {
      res.statusCode = 404;
      res.end();
    }
  }
})

server.listen(4000, () => {
  console.log('Server running on port 4000');
})