const fs = require('fs');

let listadoPorHacer = [];
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    return new Promise((resolve, reject) => {

        // const data = new Uint8Array(Buffer.from('Hello Node.js'));
        fs.writeFile(`db/data.json`, data, (err) => {
            if (err)
                reject(err)
            else
                resolve(`../db/data.json`.green);
        });
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}
const getListado = () => {
    cargarDB();

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
    /*
     cargarDB();
     let nuevoListado = listadoPorHacer.filter(tarea => {
         return tarea.descripcion !== despcripcion
     })
     if(listadoPorHacer.lenght === nuevoListado.lenght){
         return false;
     }else{
         listadoPorHacer = nuevoListado;
         guardarDB();
        return true;
     }
    */
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}