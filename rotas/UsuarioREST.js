"use strict"

const express = require('express');
const router = express.Router();
var bancoUser = require("../model/bancoUser");
// nesse arquivo fica a rota que lida com os cartoes
router.get("/", (req, res, next) => {

    bancoUser.buscarTodosUser((resultado) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });

});

router.get("/by-login/:login", (req, res, next) => {

    bancoUser.buscarUsuarioLogin(req.params.login,(resultado) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });

});
router.get("/like/login/:login", (req, res, next) => {
    var login = req.params.login;
    console.log("login: " + JSON.stringify(req.body));
    bancoUser.buscarUsuarioLoginLike(login,(resultado) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });

});


router.get("/gerente", (req, res, next) => {
    bancoUser.buscarTodosGerentes((resultado) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });
});
router.get("/gerente/:id", (req, res, next) => {
    bancoUser.buscarGerenteIdUser(req.params.id,(resultado) => {
        console.log("Gerentes " + JSON.stringify(resultado));
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });
});



router.post("/registrar", (req, res, next) => {
    let dados = req.body;
    console.log("Resgistando" + JSON.stringify(dados));
    bancoUser.InserirUser(dados, (resposta, msgSucesso) => {
        res.status(200).send({
            "mensagem": "ok",
            "msg": msgSucesso,
            "resposta": resposta
        })
    });
});

router.post("/registrar/gerente", (req, res, next) => {
    let dados = req.body;
    console.log("Resgistando gerente" + JSON.stringify(dados));
    bancoUser.inserirRelacaoGerente(dados["idUser"], (resposta, msgSucesso) => {
        res.status(200).send({
            "mensagem": "ok",
            "msg": msgSucesso,
            "resposta": resposta
        })
    });
});



module.exports = router;