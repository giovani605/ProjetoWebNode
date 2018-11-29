"use strict"

const express = require('express');
const router = express.Router();
var bancoUser = require("../model/bancoUser");
var bancoRestaurante = require("../model/bancoRestaurante");
var restauranteBO = require("../business/restauranteBO");

// nesse arquivo fica a rota que lida com os cartoes
router.get("/usuario/:id", (req, res, next) => {
    bancoRestaurante.buscarRestauranteIdUser(req.params.id, (resultado) => {
        // a flag indica se encontrou ou nao os dados
        if (resultado.length > 0) {
            res.status(200).send({
                "mensagem": "ok",
                "flagDados": true,
                "dados": resultado,
                "flagGerente": true,
                "flagColaborador": true,
                "idGerente": resultado[0]["idgerente"]
            });
        } else {
            bancoRestaurante.buscarRestauranteIdUserFuncionario(req.params.id, (resultado) => {
                if (resultado.length > 0) {
                    res.status(200).send({
                        "mensagem": "ok",
                        "flagDados": true,
                        "dados": resultado,
                        "flagGerente": false,
                        "flagColaborador": true,
                        "idGerente": resultado[0]["idgerente"]
                    });

                } else {
                    res.status(200).send({
                        "mensagem": "ok",
                        "flagDados": false,
                        "dados": resultado,
                        "flagGerente" : false,
                        "flagColaborador": false,
                        "idGerente": 0
                    });
                }
            }
            );

        }
    });

});

router.get("/:id" ,(req, res, next) => {
    bancoRestaurante.buscarRestauranteIdRestaurante(req.params.id, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resposta,
            "flag": flag
        })
    });
});
router.post("/registrar", (req, res, next) => {
    var idGerente = req.body.idGerente;
    var dadosRestaurante = req.body.dadosRestaurante;

    console.log("Inserindo Restaurante " + idGerente + " dados " + dadosRestaurante);
    bancoRestaurante.inserirRestaurante(idGerente, dadosRestaurante, (resposta) => {
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta
        })
    });
});

router.get("/isGerente/:id", (req, res, next) => {
    bancoRestaurante.isGerente(req.params.id, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta,
            "flag": flag
        })
    });
});

router.get("/isColaborador/:id", (req, res, next) => {
    bancoRestaurante.isColaborador(req.params.id, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta,
            "flag": flag
        })
    });
});

router.get("/gerente/colaboradores/:id", (req, res, next) => {
    bancoRestaurante.buscarColaboradoresGerentes(req.params.id, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resposta,
            "flag": flag
        })
    });
});


router.get("/gerente/reservas/:id", (req, res, next) => {
    bancoRestaurante.buscarReservasRestaurante(req.params.id, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resposta,
            "flag": flag
        })
    });
});


router.post("/gerente/inserir/colaboradores", (req, res, next) => {
    var idGerente = req.body.idGerente;
    var idRestaurante = req.body.idRestaurante;
    var idUser = req.body.idUser;

    console.log("Inserindo Colaborador " + idGerente + " iduser " + idUser);
    restauranteBO.inserirColaborador(idUser ,idGerente , idRestaurante, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta,
            "flag" : flag
        })
    });
});


module.exports = router;