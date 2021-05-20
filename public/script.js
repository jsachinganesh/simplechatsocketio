const username = prompt("What is your name?")

const from = document.querySelector('.input-form');
const messageBox = document.querySelector('.messageBox');
const displayMessage = document.querySelector('.displayMessage');

const socket = io('/');
const messageServer = io('/message');

from.addEventListener('submit',(e)=>{
    e.preventDefault();
    const mess = messageBox.value;
    const data = {
        message:mess,
        username
    }
    messageServer.emit('messageSend',data)

    

    messageBox.value = '';

});



socket.on('done',(dataFromServer)=>{
    console.log(dataFromServer.data);
    displayMessage.innerHTML = '';
    dataFromServer.data.forEach((el,i)=>{
        displayMessage.innerHTML += buildMessage(el);

    });
    displayMessage.scrollTo(0,displayMessage.scrollHeight);

})

messageServer.on('messListen',(data)=>{
    console.log(data);
});

messageServer.on('messageRev',(data)=>{
    displayMessage.innerHTML += buildMessage(data);
    displayMessage.scrollTo(0,displayMessage.scrollHeight);
    console.log(data);
});

function buildMessage(data){
    const liHTML = `
    <li class="m-2">
        <div class="name bold"><strong>${data.username}</strong></div>
        <div class="message">${data.message}</div>
    </li>
    `;

    return liHTML;
}