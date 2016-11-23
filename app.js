var app = require('./config/server');

var server = app.listen(8000, function(){
  console.log("Server run in localhost:8000");
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('User on');
  socket.on('disconnect', function(){
    console.log('User off');
  })
});
