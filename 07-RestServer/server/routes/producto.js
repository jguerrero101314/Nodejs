const express = require('express');
const { verificaToken } = require('../middlewares/authentication');
let app = express;
let Producto = require('../models/producto');


// =======================
// Obtener productos
// =======================
app.get('/productos', (req, res) => {

    //trae todos los productos
    //populate: usuario categoria
    //paginado
});
// ============================
// Obtener un producto por ID
// ============================
app.get('/productos/:id', (req, res) => {
    //populate: usuario categoria
});
// ============================
// Crear un nuevo producto
// ============================
app.post('/productos', (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado
});
// ============================
// Actualiza un producto por ID
// ============================
app.put('/productos/:id', (req, res) => {

});
// ============================
// Borrar un producto por ID
// ============================
app.delete('/productos/:id', (req, res) => {

});









module.exports = app;