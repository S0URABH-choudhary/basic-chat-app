const socket = io();

const  form = document.getElementById("message-container");
const messagebox = document.getElementById("chat")
const  messageInput = document.getElementById("message-input");
const myname = document.getElementById("chat-header")

const name = prompt("enter your name");
socket.emit("new-user-joined", name);





// to display user name on top of the tab
addname = (name) => {
    const nameelement = document.createElement("h1");
    nameelement.innerText = name;
    nameelement.classList.add("my-name");
    myname.append(nameelement);
}
addname(name)

// to announce who joined 
socket.on('user-joined', name =>{
    appand(`${name}: have joined the chat`, 'left')
    
}) 

// sending and receving messages
socket.on("message-received", data =>{
    appand(`${data.name}: ${data.message}`, "left")
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
