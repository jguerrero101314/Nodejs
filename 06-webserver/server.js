const express = require('express');
const app = express();
const hbs = require('hbs');

app.use(express.static(__dirname + '/public'));
// Express HBS engine

hbs.registerPartials(__dirname + '/views/parciales');
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
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto 3000')
})