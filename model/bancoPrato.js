const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;
var formatarData = Banco.formatarData;
var inserirBoolean = Banco.inserirBoolean;

// testar
function inserirPratoDia(dadosPratoDia, callback) {
    var query = "INSERT INTO prato_dia( idprato, dia, responsavel, aprovado) " +
        "VALUES (" + dadosPratoDia["idPrato"] + "," + formatarData(new Date(dadosPratoDia["data"])) + "," +
        inserirAspas(dadosPratoDia["responsavel"]) + "," +
        inserirBoolean(dadosPratoDia["aprovado"]) + ", null);"
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
        callback(res, true, "prato inserido com sucesso");
        return;
    });
}
exports.inserirPratoDia = inserirPratoDia;

// corrigir a parte de inserir tag
function inserirPrato(idRestaurante, idImagem, dadosPratos, callback) {
    var query = "INSERT INTO pratos(restaurante_idrestaurante, tag_idtag, idimagem, nome,descricao) " +
        "VALUES(" + idRestaurante + ",1," + inserirAspas(idImagem) + "," +
        inserirAspas(dadosPratos["nome"]) + "," +
        inserirAspas(dadosPratos["descricao"]) + ");"
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
        callback(res, true, "prato inserido com sucesso");
        return;
    });
}
function buscarPratosRestaurante(idRestaurante, callback) {
    var query = "select * from pratos  where restaurante_idrestaurante = " + idRestaurante;
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            callback(res.rows, false);
            return;
        }
        console.log("Selecionado pratos : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}
function buscarPratosIdPrato(idPrato, callback) {
    var query = "select * from pratos  where idpratos = " + idPrato;
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            callback(res.rows, false);
            return;
        }
        console.log("Selecionado pratos : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}
exports.buscarPratosIdPrato = buscarPratosIdPrato;
exports.buscarPratosRestaurante = buscarPratosRestaurante;
exports.inserirPrato = inserirPrato;