//requireds
const fs = require('fs');
let data = '';

let base = 10;

for (let i = 1; i <= 10; i++) {
    data += `${base} * ${i} = ${base*i}\n`;
}
// const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.writeFile(`tablas/tabla-${base}.txt`, data, (err) => {
    if (err) throw err;
    console.log(`El archivo tabla-${base}.txt ha sido creado`);
});