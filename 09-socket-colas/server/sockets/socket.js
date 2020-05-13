const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    // escuchar el cliente

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        if (!callback) return;
        callback(siguiente);
    });
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicker(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }


        let atenderTicket = ticketControl.atenderTicket(data.escritorio);



        callback(atenderTicket);
        //actualizar/notificar cambios en los ultimos 4
    });

});