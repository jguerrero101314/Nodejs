const express = require('express');

let { verificaToken, verificaAdminRole } = require('../middlewares/authentication');

let app = express();

let Categoria = require('../models/categoria');
const _ = require('underscore');

// ============================
// Mostrar todas las categorias
// ============================
app.get('/categoria', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Categoria.find()
        .skip(desde)
        .limit(limite)
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Categoria.countDocuments((conteo) => {
                res.json({
                    ok: true,
                    categorias,
                    registros: conteo
                });
            });
        });
});
// ============================
// Mostrar una categoria por ID
// ============================
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);
    Categoria.findById(id, body, { new: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id no es correcto'
                }
            });
        } else {
            console.log("verificando el resultado ");
            console.log(categoriaDB); // esta mostrabdo correctamente
            res.json({
                ok: true,
                categoria: categoriaDB // pero no esta retornando en postman
            });
        };
    });
    // categoria.findById(....);

});
// ===========================
// Crear nueva categoria
// ===========================
app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria
    //req.usuario._id
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});
// ===========================
// Actualiza la categoria
// ===========================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err
            });
        } else {
            console.log("verificando el resultado ");
            console.log(categoriaDB); // esta mostrabdo correctamente
            res.json({
                ok: true,
                categoria: categoriaDB // pero no esta retornando en postman
            });
        };

    });
});
// ===========================
// Elimina una categoria
// ===========================
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    //solo un admin puede borras categorias
    //Categoria.findByIdAndRemove
    let id = req.params.id;
    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La categoria no se pudo eliminar'
                }
            });
        } else if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        } else {
            console.log("verificando el resultado ");
            console.log(categoriaDB);
            res.json({
                ok: true,
                categoria: categoriaDB
            });
        }

    });

});

module.exports = app;