// Esse arquivo cuida da camada de negocio quando necessario
var banco = require("../model/bancoRestaurante");


function inserirColaborador(idUser,idGerente,idRestaurente,callback){
    // testar o id de gerente
    banco.isGerente(idGerente, (dados,flag) => {
        if(flag){
            banco.inserirColaborador(idUser,idGerente,callback);
        }else{
            callback({},false);
        }
    });

}

exports.inserirColaborador = inserirColaborador;
