var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var auth = require("./rotas/AuthREST");
var imagemREST = require("./rotas/ImagemREST");
var usuarioREST = require("./rotas/UsuarioREST");

// para poder mandar dados para o angular
app.use(bodyParser.json());

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


module.exports = app;