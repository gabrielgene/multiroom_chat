var app = require('./config/server');

var server = app.listen(8000, function(){
  console.log("Server run in localhost:8000");
});

var io = require('socket.io').listen(server);

app.set('io', io);
io.on('connection', function(socket){
  console.log('User on');
  socket.on('disconnect', function(){
    console.log('User off');
  })

  socket.on('msgParaServidor', function(data){

    /*dialogo*/
    socket.emit(
      'msgParaCliente',
       {apelido: data.apelido, mensagem: data.mensagem}
     );

     socket.broadcast.emit(
       'msgParaCliente',
        {apelido: data.apelido, mensagem: data.mensagem}
      );

      /*participantes*/
      if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
        socket.emit(
          'participantesParaCliente',
           {apelido: data.apelido}
         );

         socket.broadcast.emit(
           'participantesParaCliente',
            {apelido: data.apelido}
        );
      }
  });
});
