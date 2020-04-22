const descripcion = {
    demand: true,
    alias: 'd',
    descripcion: 'Descripcion de la tarea por hacer'
};
const completado = {
    default: true,
    alias: 'c',
    descripcion: 'Marca como compleado o pendiente la tarea'
}
const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completo de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra un elemento por hacer', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}