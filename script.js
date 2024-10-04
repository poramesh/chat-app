
/*** 

Events Handled on the Client-Side:

***/



const socket = io('http://localhost:3000') //refers to the port where your Socket.IO server (running in Node.js) is listening for connections.
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')

// automatically runs once user submits a name
appendMessage('You joined')


socket.emit('new-user', name);

// The client listens for the chat-message event from the server. When the server broadcasts a chat message to other users, 

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})



// When the server broadcasts the user-connected event (when a new user joins the chat), the other connected clients will be notified and will display that the user has connected

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

//When a user disconnects, the server notifies all other connected clients via the user-disconnected event, and it gets displayed in the chat.

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})


// 'submit' event is fired when 'enter' key is clicked from the
// <input> tag OR if the Submit button is clicked (due to id name)

messageForm.addEventListener('submit', e => {
  e.preventDefault() //By calling preventDefault() on the submit event, you prevent this page reload and allow you to handle the form submission in a custom way.
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message) //When a user submits a message, the client emits the send-chat-message event to the server along with the message. This message is then broadcast to all other connected clients via the server.
  messageInput.value = '' //By setting messageInput.value to an empty string, you ensure that the text box is cleared for the next message.
})


// results in text outputting to browser

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}





/**
 * 
 * 
 * 
 * 
 * In Socket.IO, both emit and broadcast.emit are used to send messages, but they differ in who receives the message.
 *  
 * emit:
 * emit sends a message to only the client or clients specified.
 * If you use emit on a specific socket, it sends the message to only that particular socket (i.e., the client that is connected to that socket).
 * If you use emit on the server-side Socket.IO instance (io), it sends the message to all connected clients.
 */


/**
 * 
 *
 *  How io() Works
Function Call: The io() function is a global function provided by the Socket.IO client library. It
 is available on the client-side because the library is included in your HTML file.

Parameters: The parameter 'http://localhost:3000' is the URL of your Socket.IO server. It specifies where the client should connect.

Returns a Socket Instance: The io() function returns a Socket instance that represents the connection to the server. 
This instance is used to communicate with the server and handle events.
 */


/**
 * 
 * 
 * Why Not require?
 * 
Client-Side vs. Server-Side:

require is used in Node.js environments to include modules in server-side code. It is part of 
the CommonJS module system used in Node.js.

On the client-side (in the browser), require is not available. Instead, you use <script> tags to include external libraries or modules.

Script Loading: For client-side JavaScript, you load the Socket.IO client library using a <script> tag.
 This makes the io function available globally in your browser environment. You do not need require because 
 you are not in a Node.js environment where require is used.
 */


 /**
  * 
  * 
  * 
  * 
Client-Side Flow

Include the Socket.IO Client Library: The library is loaded via the <script> tag in your HTML, which makes the io 
function available globally.

Establish Connection: The io() function is called with the URL of the Socket.IO server. This function initiates a
 WebSocket connection (or fallback to other transport methods if necessary) to the server at the specified URL.

 Create a Socket Instance: The socket variable holds the Socket.IO client instance, which you use to listen for events
  and emit messages.
  */