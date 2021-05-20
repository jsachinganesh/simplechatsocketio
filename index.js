const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const socketIO = require('socket.io');
const messages = [];
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
dotenv.config({path:'./config.env'});

const server = app.listen(process.env.PORT,()=>{
    console.log("Server started on port "+process.env.PORT);
});

const io = socketIO(server);

app.get('/',(req,res)=>{
    res.render('index.html')
});

io.on('connect',(socket)=>{
    socket.emit('done',{data:messages})
});

io.of('/message').on('connect',(socket)=>{
    socket.emit('messListen',{Data:"connected to chat"})
    socket.on('messageSend',(msg)=>{
        messages.push(msg);
        io.of('/message').emit("messageRev",msg);
    })
})
