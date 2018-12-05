"use strict"

const express = require('express');
const router = express.Router();
var bancoComentario = require("../model/bancoComentario");

// nesse arquivo fica a rota que lida com os cartoes
router.get("/buscar/restaurante/:id", (req, res, next) => {
    bancoComentario.buscarTodosComentariosRestaurante(req.params.id ,(resultado, flag)=>{
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado,
            "flag" : flag
        })
    });
});

router.get("/buscar/prato/:id", (req, res, next) => {
    bancoComentario.buscarTodosComentariosPratos(req.params.id ,(resultado, flag)=>{
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado,
            "flag" : flag
        })
    });
});

router.get("/media/prato/:id", (req, res, next) => {
    console.log('Buscando media do prato');
    bancoComentario.buscarNotaPrato(req.params.id ,(resultado, flag)=>{
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado,
            "flag" : flag
        })
    });
});

router.get("/media/restaurante/:id", (req, res, next) => {
    console.log('Buscando media do restaurante');
    bancoComentario.buscarNotaRestaurante(req.params.id ,(resultado, flag)=>{
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : resultado,
            "flag" : flag
        })
    });
});

router.post("/inserir/prato", (req, res, next) => {
    var idUsuario = req.body.idUsuario;
    var idPrato = req.body.idObjeto;
    var nota = req.body.nota;
    var comentario = req.body.comentario;    

    console.log("Inserindo avaliação de prato. idUsuário:  " + idUsuario + 
    " | idPrato: " + idPrato + " | Nota: " + nota + " | Comentário: '" + comentario + "'");
    bancoComentario.inserirComentarioPrato(idUsuario, idPrato, nota, comentario, (resposta) => {
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta
        })
    });
});

router.post("/inserir/restaurante", (req, res, next) => {
    var idUsuario = req.body.idUsuario;
    var idRestaurante = req.body.idObjeto;
    var nota = req.body.nota;
    var comentario = req.body.comentario;    

    console.log("Inserindo aveliação de restaurante. idUsuário " + idUsuario + 
    " | idRestaurante: " + idRestaurante + " | Nota: " + nota + " | Comentário: '" + comentario + "'");
    bancoComentario.inserirComentarioRestaurante(idUsuario, idRestaurante, nota, comentario, (resposta) => {
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta
        })
    });
});

module.exports = router;