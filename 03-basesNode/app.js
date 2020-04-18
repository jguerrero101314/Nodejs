const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar');
const argv = require('./config/yargs').argv;
let comando = argv._[0];
switch (comando) {
    case 'listar':
        listarTabla(argv.base, argv.limite);
        break;
    case 'crear':
        crearArchivo(argv.base, argv.limite).then(archivo => console.log(`Archivo creado: ${archivo}`)).catch(e => console.log(e));
        break;
    default:
        console.log('Comando no reconocido')

}
// let argv2 = process.argv;
// console.log('Limite', argv.limite);

// let parametro = argv[2];
// console.log(parametro);
// let base = parametro.split('=')[1];
// console.log(base);