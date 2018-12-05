"use strict"

const express = require('express');
const router = express.Router();
var bancoReserva = require("../model/bancoReserva");

router.get("/buscarReservasPorUsuario/:id", (req, res, next) => {
    bancoReserva.buscarReservasPorUsuario(req.params.id, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resposta,
            "flag": flag
        })
    });
});

router.post("/inserir", (req, res, next) => {
    var idPrato = req.body.idPrato;
    var idUser = req.body.idUser;
    var data_reserva = req.body.data_reserva;
    var codigo = req.body.codigo;


    bancoReserva.inserirReserva(idPrato, idUser, data_reserva, codigo, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "msg": resposta,
            "flag": flag
        })
    });
});

module.exports = router;