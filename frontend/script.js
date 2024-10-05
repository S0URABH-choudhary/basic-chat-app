const socket = io();

const  form = document.getElementById("message-container");
const messagebox = document.getElementById("chat")
const  messageInput = document.getElementById("message-input");

// for taking the name of the user joining 
var name = prompt("enter your name");
socket.emit("new-user-joined", name);

// to announce who joined 
socket.on('user-joined', name =>{
    appand(`${name}: have joined the chat`, 'right')
})

// sending and receving messages
socket.on("message-received", (message , name) =>{
    appand(`${name} ${message}`, "left")
})

// to turn off default behavior of the message input so page do not refreash
form.addEventListener("submit", function(e) {
    e.preventDefault()
})

appand = (message , position) => {
    const messageelement = document.createElement("div");
    messageelement.innerText = message;
    messageelement.classList.add(position);
    messagebox.append(messageelement);

}

sendmessage = () => {
    message = messageInput.value;
    console.log(message)
    messageInput.value = '';
    socket.emit("message-send", message)
    appand(`you : ${message}`, 'right')

}
