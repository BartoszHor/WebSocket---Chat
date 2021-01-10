const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');
const messages = [];
const users = [];

const server = app.listen(8000,()=> {
    console.log('Server connected');
});

const io = socket(server)
 
io.on('connection', (socket) => {
    
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => { console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message)
    socket.broadcast.emit('message', message)
    });
    socket.on('user', (message) => { console.log('Oh, I\'ve got something from ' + socket.id);
    users.push({...message, id: socket.id})
    });
    socket.on('addUser', (message) => { console.log('Oh, I\'ve got something from ' + socket.id);
    const connectingUser = users.find(user => user.id === socket.id)
    socket.broadcast.emit('addUser', connectingUser)
    });
    socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left')
    const disconectingUser = users.find(user => user.id === socket.id)
    const index = users.indexOf(disconectingUser)
    users.splice(index, 1)
    socket.broadcast.emit('user', disconectingUser)
    });
    console.log('I\'ve added a listener on message event \n');
  });

app.use(express.static(path.join(__dirname,'/client')));

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'/client/index.html'));
})