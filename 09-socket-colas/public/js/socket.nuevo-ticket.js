// comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', function() {
    console.log('Conectado al server');
});
// escuchar informacion o sucesos
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});


$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});