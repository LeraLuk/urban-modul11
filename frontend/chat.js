const chat = document.getElementById("chat");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

const socket = new WebSocket("ws://localhost:8080");

socket.onopen = (e) => {
  console.log("conection ok");
};
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const messageElement = document.createElement("div");
  if (message.type === "system") {
    messageElement.classList.add("system-message");
  }
  messageElement.textContent = message.content;
  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;
};
socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(
      `conection close clear, code=${event.code} reason=${event.reason}`
    );
  } else {
    console.log("conection error");
  }
};

socket.onerror = (error) => {
  console.log(`error ${error.message}`);
};

messageForm.onsubmit = (e) => {
  e.preventDefault();
  if (messageInput.value) {
    const message = {
      type: "user",
      content: messageInput.value,
    };
    socket.send(JSON.stringify(message));
    messageInput.value = "";
  }
};
