const WebSocket = require('ws');
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  
  if (req.url === "/"){
    fs.readFile(path.join(__dirname, 'client', 'index.html'), (err, data)=>{
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      res.end(data)
    })
  }
}
)

const wsServer = new WebSocket.WebSocketServer({ server });

wsServer.on('connection', function (ws) {
    
  ws.on('message', function message(data, isBinary) {
      wsServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          let json = JSON.parse(data.toString())
          const message = `{"nicknameIs": "${json.nicknameIs}", "messageIs": "${json.messageIs}"}`
          client.send(message, { binary: isBinary })
        }
      });  
    });
})

server.listen(8080);