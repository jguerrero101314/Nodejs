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
    });

});