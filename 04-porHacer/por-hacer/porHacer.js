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

const crear = (descripcion) => {
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

module.exports = {
    crear
}