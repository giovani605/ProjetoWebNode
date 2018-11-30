

const Banco = require("./bancoDados");
const conexao = Banco.conexao;

//retorna todas as cidades do banco de dados
function getCidades(callback){
    var querry = "select id, nome, estado_id from cidades;";
    conexao.query(querry, (err, res) => {
        if (err) {
            console.log("LOG: erro ao buscar todas as cidades\n\tlocal: bancoLocal.js\n\tfunction: getTodasCidades");
            console.log("\terro: " + err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("LOG: erro ao buscar todas as cidades\n\tlocal: bancoLocal.js\n\tfunction: getTodasCidades\n\terro: não foi retornado nenhum resultado");
            callback(res.rows, false);
            return;            
        }
        console.log("LOG: sucesso ao retornar cidades\n\tlocal: bancoLocal.js\n\tfunction: getTodasCidades\n\tretorno: " + res.rows + " cidades");
        callback(res.rows, true);
        return;
    });
} exports.getCidades = getCidades; 

//retorna todas as cidades que pertençam ao id do estado passado por referência
function getCidadesPorEstado(idEstado, callback){
    var querry = "select id, nome, estado_id from cidades where estado_id = " + idEstado + ";";
    conexao.query(querry, (err, res) => {
        if (err) {
            console.log("LOG: erro ao buscar as cidades de um estado\n\tlocal: bancoLocal.js\n\tfunction: getCidadesPorEstado");
            console.log("\terro: " + err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("LOG: erro ao buscar as cidades de um estado\n\tlocal: bancoLocal.js\n\tfunction: getCidadesPorEstado\n\terro: não foi retornado nenhum resultado");
            callback(res.rows, false);
            return;            
        }
        console.log("LOG: sucesso ao retornar cidades de um estado\n\tlocal: bancoLocal.js\n\tfunction: getCidadesPorEstado\n\tretorno: " + res.rows + " cidades");
        callback(res.rows, true);
        return;
    });
} exports.getCidadesPorEstado = getCidadesPorEstado;

//retorna uma cidade especifica base em seu id
function getCidade(idCidade, callback){
    var querry = "select id, nome, estado_id from cidades where id = " + idCidade + ";";
    console.log("Querry de pesquisa: " + querry);
    conexao.query(querry, (err, res) => {
        if (err) {
            console.log("LOG: erro ao buscar a cidade\n\tlocal: bancoLocal.js\n\tfunction: getCidade");
            console.log("\terro: " + err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("LOG: erro ao buscar a cidade\n\tlocal: bancoLocal.js\n\tfunction: getCidade\n\terro: não foi retornado nenhum resultado");
            callback(res.rows, false);
            return;            
        }
        console.log("LOG: sucesso ao retornar a cidade\n\tlocal: bancoLocal.js\n\tfunction: getCidade\n\tretornou: " + res);
        callback(res.rows[0], true);
        return;
    });
} exports.getCidade = getCidade;

//retorna todos os estado do banco
function getEstados(callback){
    var querry = "select id, nome, sigla from estados;";
    conexao.query(querry, (err, res) => {
        if (err) {
            console.log("LOG: erro ao buscar os estados\n\tlocal: bancoLocal.js\n\tfunction: getEstados");
            console.log("\terro: " + err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("LOG: erro ao buscar os estados\n\tlocal: bancoLocal.js\n\tfunction: getEstados\n\terro: não foi retornado nenhum resultado");
            callback(res.rows, false);
            return;            
        }
        console.log("LOG: sucesso ao retornar os estados\n\tlocal: bancoLocal.js\n\tfunction: getEstados\n\tretorno: " + res.rows + " estados");
        callback(res.rows, true);
        return;
    });
} exports.getEstados = getEstados;


//exemplo base

/*
function buscarPratosRestaurante(idRestaurante, callback) {
    var query = "select * from pratos  where restaurante_idrestaurante = " + idRestaurante;
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if(res.rows.length == 0){
            callback(res.rows, false);
            return;
        }
        console.log("Selecionado pratos : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}*/
