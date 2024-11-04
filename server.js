const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express();
const server = http.createServer(app);

const io = socketIo(server)

io.on('connection', (socket) => {
    console.log('New client connected', socket.id)

    socket.on('message', (message) => {
        socket.broadcast.emit('message', message);
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id)
    })
})

function error(err, req, res, next) {
    console.error(err.stack);

    res.status(500).send('Internal Server Error');
}
app.use(error);

server.listen(3000, () => {
    console.log('Listening on port 3000')
})