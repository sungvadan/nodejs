var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res) {
    fs.readFile('chat.html' , 'utf-8',function(error, content) {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(content)
    })
})


var io = require('socket.io').listen(server)

io.on('connection', function(socket) {
    socket.on('pseudo', function(pseudo) {
        socket.pseudo = pseudo
    })
    socket.on('message', function(message) {
        socket.broadcast.emit('message', {'pseudo': socket.pseudo, 'message': message})
    })
})

server.listen(8089)