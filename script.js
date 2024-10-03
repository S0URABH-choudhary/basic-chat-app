const  form = document.getElementById("message-container");
const messagebox = document.getElementById("chat")
const  messageInput = document.getElementById("message-input");
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
    appand(`you : ${message}`, 'right')

}
