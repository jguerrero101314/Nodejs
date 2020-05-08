const express = require('express');
const { verificaToken } = require('../middlewares/authentication');
let app = express();
let Producto = require('../models/producto');
const _ = require('underscore');


// =======================
// Obtener productos
// =======================

app.get('/productos', verificaToken, (req, res) => {
    //trae todos los productos
    //populate: usuario categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Producto.count((conteo) => {
                res.json({
                    ok: true,
                    productos,
                    registros: conteo
                });
            });
        });
});

// ============================
// Obtener un producto por ID
// ============================
app.get('/productos/:id', verificaToken, (req, res) => {
    //populate: usuario categoria
    let id = req.params.id;
    let body = req.body;
    Producto.findById(id, body, { new: true }, (err, productoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            } else if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id no es correcto'
                    }
                });
            } else {
                console.log("verificando el resultado ");
                console.log(productoDB); // esta mostrabdo correctamente
                res.json({
                    ok: true,
                    producto: productoDB // pero no esta retornando en postman
                });
            };
        })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion');
});

// ============================
// Crear un nuevo producto
// ============================
app.post('/productos', verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        usuario: req.usuario._id,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});
// ============================
// Actualiza un producto por ID
// ============================
app.put('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let producto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
    };
    Producto.findByIdAndUpdate(id, producto, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    });
});
// ============================
// Borrar un producto por ID
// ============================
app.delete('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto borrado'
            });

        })

    })
});






module.exports = app;