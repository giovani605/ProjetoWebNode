// Esse arquivo cuida da camada de negocio quando necessario
var banco = require("../model/bancoRestaurante");
var b = require("../model/bancoDados");
var inserirAspas = b.inserirAspas;
var formatarData = b.formatarData;
var inserirBoolean = b.inserirBoolean;
var conexao = b.conexao;

function inserirColaborador(idUser, idGerente, idRestaurente, callback) {
    // testar o id de gerente
    banco.isGerente(idGerente, (dados, flag) => {
        if (flag) {
            banco.inserirColaborador(idUser, idGerente, callback);
        } else {
            callback({}, false);
        }
    });

}
// TODO
function consertaBoolean(a) {
    if (a == true || a == "true" || a == 1 || a == "1") {
        return true;
    }
    return false;
}


function inserirPeriodoPratoDia(dadosPratoDia, callback) {
    var query = "INSERT INTO periodo_ciclo(data_inicio, data_fim, responsavel, pratoid, aprovado) " +
        "VALUES (" + formatarData(new Date(dadosPratoDia["data_inicio"])) + "," + formatarData(new Date(dadosPratoDia["data_fim"])) + "," +
        inserirAspas(dadosPratoDia["responsavel"]) + "," + dadosPratoDia["idprato"] + "," +
        consertaBoolean(dadosPratoDia["aprovado"]) + ")  RETURNING idperiodo;"
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel inserir o Prato");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true, res.rows[0]["idperiodo"]);
        return;
    });



}

function aumentarDia(d) {
    d.setDate(Number(d.getDate()) + 1);
}

function gerarValuePrato(dadosPratoDia) {
    let q = "(" + dadosPratoDia["idPrato"] + "," + formatarData(new Date(dadosPratoDia["data"])) + "," +
        inserirAspas(dadosPratoDia["responsavel"]) + "," +
        inserirBoolean(dadosPratoDia["aprovado"]) + "," + dadosPratoDia["idperiodo"] + ")";
    return q;
}

function insirerQueryGeral(query, callback) {
    console.log(query);
    b.conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel inserir o Prato");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true, "prato inserido com sucesso");
        return;
    });

}
function verificarDia(data, vetor) {
    for (let a of vetor) {
        if (a.id == data.getDay()) {
            return true;
        }
    }
    return false;
}

function inserirPeriodo(idUser, dias, dadosPeriodo, callback) {
    // se falhar usar essa funcao para o callback
    var funcFalha = function (msg, callback) {
        callback(msg, false);
    }
    // inserir o periodo e testar se deu certo ..
    inserirPeriodoPratoDia(dadosPeriodo, (resultado, flag, idperiodo) => {
        console.log("id periodo");
        console.log(idperiodo);
        if (!flag) {
            funcFalha("não consigui inserir Periodo", callback);
            return;
        }
        var dataInicial = new Date(dadosPeriodo["data_inicio"]);
        var dataFinal = new Date(dadosPeriodo["data_fim"]);
        var query = "INSERT INTO prato_dia( idprato, dia, responsavel, aprovado,idperiodo) VALUES ";
        var vetorDias = dias;
        // depois devo isnerir um a um os pratos dia
        console.log("tempo ini");
        console.log(dataInicial.getTime());
        console.log("tempo fim");
        console.log(dataFinal.getTime());
        var dataAux = new Date(dataInicial);
        for (; dataAux.getTime() < dataFinal.getTime(); aumentarDia(dataAux)) {
            if (verificarDia(dataAux, vetorDias)) {
                let a = {
                    "idPrato": dadosPeriodo["idprato"],
                    "data": dataAux,
                    "responsavel": idUser,
                    "aprovado": dadosPeriodo["aprovado"],
                    "idperiodo": idperiodo
                }
                query += gerarValuePrato(a) + " ,";
            }
        }
        query += ";";
        query = query.replace(",;", ";");
        //console.log(query);
        insirerQueryGeral(query, (res, flag) => {
            callback(res, flag);
        });

    })

}
exports.inserirPeriodo = inserirPeriodo;
exports.inserirPeriodoPratoDia = inserirPeriodoPratoDia;
exports.inserirColaborador = inserirColaborador;
