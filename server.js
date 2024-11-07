const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",              // Allow any origin
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: false        // No credentials if allowing all origins
  }
});

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('message', (message) => {
    console.log('Message received:', message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

function error(err, req, res, next) {
  console.error(err.stack);

  res.status(500).send('Internal Server Error');
}
app.use(error);

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
