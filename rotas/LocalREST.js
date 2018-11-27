"use strict"

const express = require('express');
const router = express.Router();
var bancoLocal = require("../model/bancoLocal");

//irá retornar todas as cidades
router.get("/local/cidades", (req, res, next) => {
    // recuperar parametros da imagem
    bancoLocal.getCidades((resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "flag": flag,
            "dados": resultado
        });
    });
});

router.get("/local/estados", (req, res, next) => {
    // recuperar parametros da imagem
    bancoLocal.getEstados((resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "flag": flag,
            "dados": resultado
        });
    });
});

//irá retornar todas as cidades com o id do estado passado
router.get("/local/cidades/:id", (req, res, next) => {
    // recuperar parametros da imagem
    bancoLocal.getCidadesPorEstado(req.params.id,(resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "flag": flag,
            "dados": resultado
        });
    });
});


module.exports = router;