import { Server, Socket } from "socket.io";
import products from './products.json'

const io = new Server({
  cors: {
    origin: "*"
  }
});

function alwaysEmit(socket: Socket) {

    const index = Math.floor(Math.random() * products.length)

    socket.emit('new product', products[index])

    // console.log('emitted')
    const sleep = Math.random() * 1000 * 5
    // console.log(`emitting again in ${sleep} milliseconds`)
    setTimeout(() => {
        alwaysEmit(socket)
    }, sleep)
}


io.on('connection', (socket) => {
    console.log(`a user connected`);

    alwaysEmit(socket)

    socket.on('startup acknowledge', () => {
        console.log('client acknowledged')
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

io.listen(3033)
console.log('io server started')