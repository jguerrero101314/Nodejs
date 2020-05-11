var socket = io();
socket.on('connect', function() {
    console.log('Conectado al server');
});
// escuchar informacion o sucesos
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});
// enviar informacion
socket.emit('enviarMensaje', {
    usuario: 'Joel',
    mensaje: 'Hola mundo'
}, function(resp) {
    console.log('Respuesta server: ', resp);
});
// escuchar informacion
socket.on('enviarMensaje', function(resp) {
    console.log('Servidor: ', resp);
});