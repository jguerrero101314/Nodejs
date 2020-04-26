const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
// Express HBS engine
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    //  res.send('Hello World');
    // let salida = {
    //     nombre: 'Joel',
    //     edad: 22,
    //     url: req.url
    // };
    //res.send(salida);
    res.render('home', {
        nombre: 'Joel',
        anio: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto 3000')
})