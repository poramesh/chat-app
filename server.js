/**
 * 
 * This part runs on your Node.js server. The server listens for events emitted by clients and broadcasts them to other clients.
 * 
 */


//io.on('connection', socket => {...}): This listens for a new connection from a client and handles various events for that specific connection.

const io = require('socket.io')(3000, {
	cors: {
		origin: true, // true means to use any frontend.
	},
})
const users = {}



io.on('connection', socket => {

  // When a new user joins the chat, they emit the new-user event with their name. The server stores this name (associated with the socket’s ID) and then uses socket.broadcast.emit to send the user-connected event to all other connected clients except the new user.
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })


//When a client sends a message, the server listens for the send-chat-message event.
//socket.broadcast.emit('chat-message', { message, name }) ensures that all clients except the sender receive the message.

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

//When a user disconnects, the server automatically detects it and emits the user-disconnected event to all other connected clients using socket.broadcast.emit
  // socket.broadcast.emit('user-disconnected', users[socket.id]) notifies everyone except the disconnected client that a user has left.
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})




/**
 * 
 * 
Client-Side:

Clients emit events (send-chat-message, new-user) to the server, which is responsible for handling and broadcasting those events to other clients.
Clients also listen for events (chat-message, user-connected, user-disconnected) sent by the server and update their UI accordingly.

Server-Side:

The server listens for events (new-user, send-chat-message, disconnect) from the clients.
When an event is received, the server can choose to emit to all clients (io.emit) or broadcast the message to all clients except the sender (socket.broadcast.emit).
 */



/*

SO
socket.emit behaves differently then io.emit
it also depends on whos calling who.

socket.emit() would emit the message to you but anyone else

io.emit() would emit the message to everyone including you.


socket.broadcast.emit() would emit the message to everyone but you.

theres is no io.broadcast.emit() hahahahah

*/