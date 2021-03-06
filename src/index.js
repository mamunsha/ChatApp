const path =  require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocationMessage} = require('./utils/messages')



const app = express();
const server = http.createServer(app)
const io = socketio(server)



const port = process.env.PORT || 3300
const publicDirectoryPath = path.join(__dirname, '../public')



app.use(express.static(publicDirectoryPath))

let count = 0


//server(emit) -> client (receive) - countUadated
//client (emit) -> server (receive) - increment

io.on('connection', (socket)=>{
    console.log('New websocket connection')

    socket.on('join', ({username, room})=>{
        socket.join(room)

        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))
    })

    socket.on('sendMessage', (message, callback)=>{
        const filter = new Filter()
        if(filter.isProfane(message)) {
           return callback ('profanity is not allowed')
        }
        io.to('Center City').emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coords, callback)=>{
             
     io.emit('locationMessage',generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
     callback()
    })

    socket.on('disconnect', ()=>{
        io.emit('message', generateMessage('A user left!'))
    })
})

server.listen(port, ()=>{
    console.log(`Server is on ${port}`)
})