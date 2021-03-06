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


router.get("/usuario/by-userid/:id", (req, res, next) => {

    bancoUser.buscarUsuarioIduser(req.params.id,(resultado) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });

});

router.get("/by-login/:login", (req, res, next) => {

    bancoUser.buscarUsuarioLogin(req.params.login, (resultado) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });

});
router.get("/like/login/:login", (req, res, next) => {
    var login = req.params.login;
    console.log("login: " + JSON.stringify(req.body));
    bancoUser.buscarUsuarioLoginLike(login, (resultado) => {
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
    bancoUser.buscarGerenteIdUser(req.params.id, (resultado) => {
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

router.get("/amigos/:id", (req, res, next) => {
    bancoUser.buscarAmigos(req.params.id, (resultado) => {
        console.log("Amigos " + JSON.stringify(resultado));
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });
});

router.get("/reservas/:id", (req, res, next) => {
    bancoUser.buscarReservas(req.params.id, (resultado) => {
        console.log("Reservas " + JSON.stringify(resultado));
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });
});

// TODO recuperar os amigos
router.get("/amigos/:id", (req, res, next) => {
    console.log("sdadsadsa");
    bancoUser.buscarAmigos(req.params.id, (resultado) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado
        });
    });
});

// TODO adicionar os amigos
router.post("/adicionar/amigos", (req, res, next) => {
    var userId1 = req.body.userid1;
    var userId2 = req.body.userid2;
    console.log("adiconar amigos :" + userId1 + " " + userId2);
    console.log(req.body);
    bancoUser.inserirAmigos(userId1, userId2, (resultado, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado,
            "flag": flag
        });
    });
});

// notificacao
router.post("/inserir/notificacao", (req, res, next) => {
    var dados = req.body.dados
    console.log(dados);
    bancoUser.inserirNotificacao(dados, (resultado, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado,
            "flag": flag
        });
    });
});

// TODO SE necessario
router.get("/buscar/notificao/:id", (req, res, next) => {
    var userId1 = req.body.userid1;
    var userId2 = req.body.userid2;
    console.log("adiconar amigos :" + userId1 + " " + userId2);
    console.log(req.body);
    bancoUser.inserirAmigos(userId1, userId2, (resultado, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado,
            "flag": flag
        });
    });
});


router.get("/buscar/notificao/by-iduser/:id", (req, res, next) => {
    bancoUser.buscarNotificacaoIdUser(req.params.id, (resultado, flag) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": resultado,
            "flag": flag
        });
    });
});




module.exports = router;