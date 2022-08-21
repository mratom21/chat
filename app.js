const webSocket = new WebSocket('ws://172.27.0.11:3000')

webSocket.onopen = event => {
    document.querySelector('.status').innerHTML = 'online'
}

webSocket.onclose = event => {
    document.querySelector('.status').innerHTML = 'offline'
    document.querySelector('.status').classList.add('offline')
}

webSocket.onmessage = event => {
    sendMessage(event.data)
}

let nickname = 'client'

const btn = document.querySelector('.send-button')
const input = document.querySelector('.chat-input input')

const btnSave = document.querySelector('.save-button')
const inputNickName = document.querySelector('.nickname input')

btnSave.addEventListener('click', setNickName)
inputNickName.onkeydown = event => {
    if (event.keyCode === 13){
        setNickName()
    }
}

function setNickName(){
    nickname = document.querySelector('.nickname input').value
    console.log(nickname) 
}

btn.addEventListener('click', sendMessage)
input.onkeydown = event => {
    if (event.keyCode === 13){
        sendMessage()
    }
}

function sendMessage(str=''){
    if (str === ''){
        const input = document.querySelector('.chat-input input')
        const message =  `[${nickname}]: ${input.value}`
        
        if (input.value === ''){
        }else {
            webSocket.send(message)
            input.value = ''
        }
    } else {
        const display = document.querySelector('.display')
        const divMessage = document.createElement('div')
        const p = document.createElement('p')
        divMessage.className = 'message'
        p.innerHTML = str
        divMessage.appendChild(p)
        display.appendChild(divMessage)
    }
    
}
