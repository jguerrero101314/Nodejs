// const opts = {
//     descripcion: {
//         demand: true,
//         alias: 'd',
//         descripcion: 'Descripcion de la tarea por hacer'
//     },
//     descripcion: {
//         demand: true,
//         alias: 'd',
//         descripcion: 'Descripcion de la tarea por hacer'
//     },
//     completado: {
//         default: true,
//         alias: 'c',
//         descripcion: 'Marca como compleado o pendiente la tarea'
//     }
// }

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion: {
            demand: true,
            alias: 'd',
            descripcion: 'Descripcion de la tarea por hacer'
        }
    })
    .command('actualizar', 'Actualiza el estado completo de una tarea', {
        descripcion: {
            demand: true,
            alias: 'd',
            descripcion: 'Descripcion de la tarea por hacer'
        },
        completado: {
            default: true,
            alias: 'c',
            descripcion: 'Marca como compleado o pendiente la tarea'
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}