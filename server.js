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
  socket.emit('New client connected', socket.id);

  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
    console.log("offer server", offer)
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
    console.log("answer server", answer)
  });

  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
    console.log("ice-candidate server", candidate)
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
