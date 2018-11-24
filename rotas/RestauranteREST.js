"use strict"

const express = require('express');
const router = express.Router();
var bancoUser = require("../model/bancoUser");
var bancoRestaurante = require("../model/bancoRestaurante");

// nesse arquivo fica a rota que lida com os cartoes
router.get("/", (req, res, next) => {
    
});
router.post("/registrar", (req, res, next) => {
    var idGerente = req.body.idGerente;
    var dadosRestaurante = req.body.dadosRestaurante;

    console.log("Inserindo Restaurante " + idGerente + " dados " + dadosRestaurante );
    bancoRestaurante.inserirRestaurante(idGerente,dadosRestaurante, (resposta) =>{
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta
        })
    });
});


module.exports = router;