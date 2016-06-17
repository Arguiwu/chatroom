var http = require('http'),
	socket = require('socket.io'),
	fs = require('fs'),
	app,io;
app = http.createServer(function(req,res){
	//读取本程序运行位置的client.html文件
	fs.readFile(__dirname + "/client.html",function(err,data){
		res.writeHead(200);
		res.end(data);
	})
});
app.listen(3000);
io = socket.listen(app);
io.set('log level',1);
io.sockets.on('connection',function(socket){
	//相应客户端msg事件
	socket.on('msg',function(data){
		console.log('get a msg from client' + data);
		socket.broadcast.emit('chatMessage',data);
	});
});