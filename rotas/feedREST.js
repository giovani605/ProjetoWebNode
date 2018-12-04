"use strict"

const express = require('express');
const router = express.Router();
var bancoFeed = require("../model/bancoFeed");

// nesse arquivo fica a rota que lida com os cartoes
router.get("/", (req, res, next) => {
    bancoFeed.feedGeral((resultado, flag)=>{
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado,
            "flag" : flag
        })
    });
});

router.post("/filtrar", (req, res, next) => {
    var tags = req.body.tags;
    var idCidade = req.body.idCidade;
    console.log(tags);
    bancoFeed.feedFiltro(tags, idCidade, (resultado, flag)=>{
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado,
            "flag" : flag
        })
    });
});

// TODO
router.post("/seguindo", (req, res, next) => {
    var tags = req.body.tags;
    var idCidade = req.body.idCidade;
    console.log(tags);
    bancoFeed.feedSeguir(tags, idCidade, (resultado, flag)=>{
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado,
            "flag" : flag
        })
    });
});



module.exports = router;