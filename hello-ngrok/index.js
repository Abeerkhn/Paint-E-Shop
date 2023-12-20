const http = require('http');
const ngrok = require('ngrok'); // Import ngrok package

// Create webserver
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Congrats you have created an ngrok web server');
});

server.listen(8080, () => {
  console.log('Node.js web server at 8080 is running...');

  // Start ngrok to create a tunnel
  ngrok.connect({
    proto: 'http', // Specify the protocol used by your server
    addr: 8080, // Port on which your server is running
    authtoken: '2ZmZGf5YR1ZnTFv8fJFxbbwM2fN_6NKBEmQ7SfGLQyETh5Eg7' // Replace with your Ngrok auth token
  }).then(url => {
    console.log(`Ngrok tunnel created at: ${url}`);
  }).catch(error => {
    console.error('Error starting ngrok:', error);
  });
});
