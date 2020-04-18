const { crearArchivo } = require('./multiplicar/multiplicar');
const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multipilicar', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
    })
    .help()
    .argv;

let argv2 = process.argv;
console.log('Limite', argv.limite);

// let parametro = argv[2];
// console.log(parametro);
// let base = parametro.split('=')[1];
// console.log(base);


// crearArchivo(base).then(archivo => console.log(`Archivo creado: ${archivo}`)).catch(e => console.log(e));