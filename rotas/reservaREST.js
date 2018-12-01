"use strict"

const express = require('express');
const router = express.Router();
var bancoReserva = require("../model/bancoReserva");

router.get("/buscarReservasPorUsuario/:id" ,(req, res, next) => {
    bancoReserva.buscarReservasPorUsuario(req.params.id, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resposta,
            "flag": flag
        })
    });
});

module.exports = router;