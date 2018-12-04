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
                        "flagGerente": false,
                        "flagColaborador": false,
                        "idGerente": 0
                    });
                }
            }
            );

        }
    });

});

router.get("/:id", (req, res, next) => {
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

// TODO 
router.get("/gerente/aprovar/simples/:id", (req, res, next) => {
    bancoRestaurante.buscarPratoDiaSimplesAprovar(req.params.id, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resposta,
            "flag": flag
        })
    });
});

router.post("/gerente/aprovar/simples/:id", (req, res, next) => {
    restauranteBO.aprovarSimples(req.params.id, req.body.idUser, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resposta,
            "flag": flag
        })
    });
});




// Periodo

router.get("/gerente/aprovar/periodo/:id", (req, res, next) => {
    bancoRestaurante.buscarPratoDiaAprovarCiclo(req.params.id, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resposta,
            "flag": flag
        })
    });
});

router.post("/gerente/aprovar/periodo/:id", (req, res, next) => {
    restauranteBO.aprovarPeriodo(req.params.id, req.body.idUser, (resposta, flag) => {
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
    restauranteBO.inserirColaborador(idUser, idGerente, idRestaurante, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta,
            "flag": flag
        })
    });
});

router.get("/buscar/juntos/:nome", (req, res, next) => {
    bancoRestaurante.pesquisarPratoRestaurante(req.params.nome, (pratos, restaurante, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "pratos": pratos,
            "restaurantes": restaurante,
            "flag": flag
        });
    });
});



// todo
router.post("/gerente/inserir/promocao", (req, res, next) => {
    var idGerente = req.body.idGerente;
    var idRestaurante = req.body.idRestaurante;
    var dadosPrato = req.body.prato;
    var codigo = req.body.codigo;

    console.log("Inserindo promocao " + idGerente + " idprato " +  dadosPrato["idpratos"] +" codigo "+ codigo);
    console.log(dadosPrato);
    restauranteBO.inserirCodigoPromocao(codigo, idGerente, dadosPrato["idpratos"], (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta,
            "flag": flag
        })
    });
});



router.post("/seguir/usuario", (req, res, next) => {
    var idUser = req.body.idUser;
    var idRestaurante = req.body.idRestaurante;
    console.log("Seguir restaurante " + idUser + " idRestaurante " +  idRestaurante);
    console.log(dadosPrato);
    bancoRestaurante.seguirRestaurante(idUser,idRestaurante, (resposta, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "resposta": resposta,
            "flag": flag
        })
    });
});


module.exports = router;