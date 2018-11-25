"use strict"

const express = require('express');
const router = express.Router();
const fs = require("fs");
var bancoPrato = require("../model/bancoPrato");

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })


// Salva a imagem
router.post("/registrar", upload.single('imagem'), (req, res, next) => {
    // recuperar parametros da imagem
    console.log("Cheguei aqui");
    console.log("Files:" + JSON.stringify(req.file));
    console.log("Nome do Arquivo: " + req.file.filename);
    console.log("Body " + JSON.stringify(JSON.parse(req.body["dados"])));
    // usar esse arquivo para grava no banco
    var dados = JSON.parse(req.body["dados"]);
    bancoPrato.inserirPrato(dados["restaurante_idrestaurante"], req.file.filename,
        dados, (resultado, flag) => {
            res.status(200).send({
                "mensagem": "OK",
                "flag": flag,
                "dados": resultado
            });
        });
});

router.get("/:id", (req, res, next) => {
    // recuperar parametros da imagem
    bancoPrato.buscarPratosIdPrato(req.params.id, (resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "flag": flag,
            "dados": resultado
        });
    });
});


router.get("/restaurante/:id", (req, res, next) => {
    // recuperar parametros da imagem
    bancoPrato.buscarPratosRestaurante(req.params.id, (resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "flag": flag,
            "dados": resultado
        });
    });
});

router.post("/periodo/simples", (req, res, next) => {
    // recuperar parametros da imagem
    // usar esse arquivo para grava no banco
    console.log(req.body);
    var dados = req.body;


    bancoPrato.inserirPratoDia(dados, (resultado, flag) => {
        res.status(200).send({
            "mensagem": "OK",
            "resultado" : resultado,
            "flag" : flag
        });
    });

    // bancoPrato.inserirPrato(dados["restaurante_idrestaurante"], req.file.filename,
    //     dados, (resultado,flag) => {

    //     });
});





module.exports = router;