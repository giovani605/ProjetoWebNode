var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var auth = require("./rotas/AuthREST");
var imagemREST = require("./rotas/ImagemREST");
var usuarioREST = require("./rotas/UsuarioREST");
var restauranteREST = require("./rotas/RestauranteREST");
var pratoREST = require("./rotas/pratoREST");
var feedREST = require("./rotas/feedREST");
var localREST = require("./rotas/LocalREST");
var reservaRest = require("./rotas/reservaREST");
var comentarioRest = require("./rotas/comentarioREST");

// para poder mandar dados para o angular
app.use("/",bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    console.log("Headers funcionando");
    next();
});
app.use('/static', express.static('uploads'));
app.use('/auth', auth);
app.use("/imagem", imagemREST);
app.use("/usuario", usuarioREST);
app.use("/restaurante", restauranteREST);
app.use("/prato", pratoREST);
app.use("/feed", feedREST);
app.use("/local", localREST);
app.use("/reserva", reservaRest);
app.use("/comentario",comentarioRest);


module.exports = app;