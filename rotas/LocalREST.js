"use strict"

const express = require('express');
const router = express.Router();
var bdLocal = require("../model/bancoLocal");

//irá retornar todas as cidades
router.get("/cidades", (req, res, next) => {
    // recuperar parametros da imagem
    bdLocal.getCidades((resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "flag": flag,
            "dados": resultado
        });
    });
});

router.get("/estados", (req, res, next) => {
    // recuperar parametros da imagem
    bdLocal.getEstados((resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "flag": flag,
            "dados": resultado
        });
    });
});

//irá retornar todas as cidades com o id do estado passado
router.get("/cidades/:id", (req, res, next) => {
    // recuperar parametros da imagem
    bdLocal.getCidadesPorEstado(req.params.id,(resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "flag": flag,
            "dados": resultado
        });
    });
});

router.get("/cidade/:id", (req, res, next) => {
    // recuperar parametros da imagem
    console.log('buscando cidade via ID');
    bdLocal.getCidade(req.params.id,(resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "flag": flag,
            "dados": resultado
        });
    });
});

module.exports = router;