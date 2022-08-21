const WebSocket = require('ws');
const wsServer = new WebSocket.Server({port: 3000});

wsServer.on('connection', function (ws) {
    ws.on('message', function message(data, isBinary) {
        wsServer.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
          }
        });
    });
})
