const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("new client");
  ws.send(
    JSON.stringify({
      type: "system",
      content: "Вы вошли в чат",
    })
  );

  ws.on("message", (message) => {
    let parseMessage;
    try {
      parseMessage = JSON.parse(message);
      console.log(parseMessage);
    } catch (e) {
      console.log("error:" + e);
      return;
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parseMessage));
      }
    });
  });
});

console.log("server ok");
