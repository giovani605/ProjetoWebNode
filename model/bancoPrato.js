const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;
var formatarData = Banco.formatarData;
var inserirBoolean = Banco.inserirBoolean;

// testar
function inserirPratoDia(dadosPratoDia, callback) {
    var query = "INSERT INTO prato_dia( idprato, dia, responsavel, aprovado, idperiodo) " +
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

function inserirPratoTags(idPrato, listaTags, callback) {
    var query = "INSERT INTO tag_prato (idtag,idpratos) values  ";
    for (let a of listaTags) {
        query += "(" + a["idtag"] + "," + idPrato + "),";
    }
    query += ";";
    query = query.replace(",;", ";");
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
        callback(res, true);

    });

}


// corrigir a parte de inserir tag
function inserirPrato(idRestaurante, idImagem, dadosPratos, listaTags, callback) {
    var query = "INSERT INTO pratos(restaurante_idrestaurante,  idimagem, nome,descricao) " +
        "VALUES(" + idRestaurante + "," + inserirAspas(idImagem) + "," +
        inserirAspas(dadosPratos["nome"]) + "," +
        inserirAspas(dadosPratos["descricao"]) + ") RETURNING idpratos;"
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel inserir o Prato");
            return;
        }
        var idPrato = res.rows[0]["idpratos"];
        inserirPratoTags(idPrato, listaTags, (res, flag) => {
            console.log("Inserido : ");
            console.log(res);
            callback(idPrato, flag, "prato inserido com sucesso");
            return;
        })


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
function buscarTagTodas(callback) {
    var query = "select * from tag ;"
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
        console.log("Selecionado tag : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
}

function buscarTagsPrato(id, callback) {
    var query = "select * from tag where idtag in (select tag_prato.idtag from tag_prato where idpratos = " + id + ");";
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
        console.log("Selecionado tags do prato : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
}


function buscarTagId(id, callback) {
    var query = "select * from tag where idtag = " + id;
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
        console.log("Selecionado tag : ");
        console.log(res.rows[0]);
        callback(res.rows[0], true);
        return;
    });
}
exports.buscarTagId = buscarTagId;
exports.buscarTagTodas = buscarTagTodas;
exports.buscarPratosIdPrato = buscarPratosIdPrato;
exports.buscarPratosRestaurante = buscarPratosRestaurante;
exports.inserirPrato = inserirPrato;