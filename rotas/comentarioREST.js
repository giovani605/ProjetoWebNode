"use strict"

const express = require('express');
const router = express.Router();
var bancoComentario = require("../model/bancoComentario");

// nesse arquivo fica a rota que lida com os cartoes
router.get("/comentario/buscar/restaurante/:id", (req, res, next) => {
    bancoComentario.feedGeral((resultado, flag)=>{
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado,
            "flag" : flag
        })
    });
});

router.get("/comentario/buscar/prato/:id", (req, res, next) => {
    bancoComentario.feedGeral((resultado, flag)=>{
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado,
            "flag" : flag
        })
    });
});

module.exports = router;