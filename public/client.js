const socket = io();

let name;

let textarea = document.querySelector("#textarea");

let messageArea = document.querySelector(".message_area");

do {
  name = prompt("please enter your name: ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  appendMessage(msg);
  scrollToBottom();
  textarea.value = "";

  socket.emit("message", msg);
}
function appendMessage(msg) {
  let mainDiv = document.createElement("div");

  let markup = `
    
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    
    `;
  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
}

//recive

socket.on("message", (msg) => {
  appendMessage(msg);
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
