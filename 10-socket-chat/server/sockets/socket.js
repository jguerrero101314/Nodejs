const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        if (!callback) return; // evitar que ocurra error si mensaje del cliente no se hizo con callback
        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }
        let personas = usuarios.agregarPersonas(client.id, data.nombre);
        callback(personas);
    });
});