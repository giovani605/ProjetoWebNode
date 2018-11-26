"use strict"

const express = require('express');
const router = express.Router();
var bancoUser = require("../model/bancoUser");

// nesse arquivo fica a rota que lida com os cartoes
router.get("/", (req, res, next) => {
    console.log("ola");
    res.send("ok");
});
router.post("/login", (req, res, next) => {
    let dados = req.body;
    console.log("Tentando login " + JSON.stringify(dados));
    bancoUser.buscarUsuarioLogin(dados.user, (usuario) => {
        //esse if verifica se o usuário retornado é nulo. Isto ocorre quando o login pesquisa não existe!
        if(usuario != null){
            console.log(usuario.senha + " " + dados.senha);
            if (usuario.senha == dados.senha) {
                console.log("login sucessido");
                res.status(200).json({
                    "loginFlag" : true,
                    "mensagem": "login sucessfull",
                    "token": "gerar depois",
                    "user" : usuario
                });
            } else {
                console.log("login falho" );
                res.status(200).json({
                    "loginFlag" : false,
                    "mensagem": "login falho"
                });
            }
        } else {
            console.log("login inesistente" );
                res.status(200).json({
                    "loginFlag" : false,
                    "mensagem": "login inesistente!"
                });
        }
    });
});


module.exports = router;