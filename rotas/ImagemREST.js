"use strict"

const express = require('express');
const router = express.Router();
const fs = require("fs");
var banco = require("../model/bancoDados");

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

// Get imagem
router.get("/", (req, res, next) => {
    console.log("ola");
    res.send("ok");
});

// Salva a imagem
router.post("/upload", upload.single('imagem'), (req, res, next) => {
    // recuperar parametros da imagem
    console.log("Cheguei aqui");
    console.log("Files:" + JSON.stringify(req.file));
    console.log("Nome do Arquivo: " + req.file.filename);
    // usar esse arquivo para grava no banco
    var imagem = req.body;
    console.log("imagem" + imagem.length);

    console.log("sucesso");
    res.status(200).send({ "mensagem": "OK" });



    // salvar a iamgem no file system
    // responde com mensagem
});


module.exports = router;