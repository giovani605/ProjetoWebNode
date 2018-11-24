"use strict"

const express = require('express');
const router = express.Router();
var bancoUser = require("../model/bancoUser");
// nesse arquivo fica a rota que lida com os cartoes
router.get("/", (req, res, next) => {

    bancoUser.buscarTodosUser((resultado) => {
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado
        });
    });

});

router.post("/registrar", (req, res, next) => {
    let dados = req.body;
    console.log("Resgistando" + JSON.stringify(dados));
    bancoUser.InserirUser(dados, (resposta,msgSucesso) => {
        res.status(200).send({
            "mensagem" : "ok",
            "msg" : msgSucesso,
            "resposta" : resposta
        })
    });
});


module.exports = router;