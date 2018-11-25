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
        dados, (resultado,flag) => {
            res.status(200).send({
                "mensagem": "OK",
                "flag": flag,
                "dados": resultado
            });
        });
});


module.exports = router;