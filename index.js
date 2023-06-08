const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;
const cors = require('cors');


app.use(cors()); // Enable CORS for all routes
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // 클라이언트의 주소
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    console.log(msg)
    const message = JSON.parse(msg);
    console.log(message.answer);
    console.log(message.value);
    if (message.answer === message.value) {
      const jsonMsg = { message: true };
      io.emit('chat message', JSON.stringify(jsonMsg));
    }
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
