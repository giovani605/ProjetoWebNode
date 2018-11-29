// apenas para nao ficar tudo em uma arquivo do banco

const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;

function buscarRestauranteIdRestaurante(idRestaurante, callback){
    var query = "SELECT * FROM restaurante where idrestaurante = " + idRestaurante;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows[0]);
        callback(res.rows[0], true);
        return;
    });


}
exports.buscarRestauranteIdRestaurante = buscarRestauranteIdRestaurante;



function inserirRestaurante(idGerente, dadosRestaurante, callback) {
    console.log("desc: " + inserirAspas(dadosRestaurante["descricao"]));

    var query = "INSERT INTO restaurante(gerente_idgerente," +
        "cidades_id, nome, descricao,telefone, rua, numero) " +
        "VALUES(" + idGerente + ",1," + inserirAspas(dadosRestaurante["nome"]) + "," +
        inserirAspas(dadosRestaurante["descricao"]) +
        "," + inserirAspas(dadosRestaurante["telefone"]) +
        "," + inserirAspas(dadosRestaurante["rua"]) +
        "," + dadosRestaurante["numero"] + ");"
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, "Não foi possivel inserir o Restaurante");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, "Restaurante inserido com sucesso");
        return;
    });
}

function buscarRestauranteIdUser(idUser, callback) {
    var query = "SELECT r.*,g.idgerente FROM restaurante r inner join gerente g on g.idgerente = r.gerente_idgerente " +
        "inner join usuario u on u.idusuario = g.usuario_idusuario where u.idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, "Não foi possivel inserir o Restaurante");
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows);
        return;
    });

}
exports.buscarRestauranteIdUser = buscarRestauranteIdUser;

function buscarRestauranteIdUserFuncionario(idUser, callback) {
    var query = "SELECT r.*,g.idgerente FROM restaurante r inner join gerente g on g.idgerente = r.gerente_idgerente " +
        "inner join colaborador u on u.idgerente = g.idgerente where u.idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, "Não foi possivel inserir o Restaurante");
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows);
        return;
    });
}

function isColaborador(idUser, callback) {
    var query = "SELECT * FROM colaborador where idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows[0]);
        callback(res.rows[0], true);
        return;
    });
}
function isGerente(idUser, callback) {
    var query = "SELECT * FROM gerente where usuario_idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows[0]);
        callback(res.rows[0], true);
        return;
    });
}
function buscarColaboradoresGerentes(idGerente, callback) {
    var query = "select * from colaborador c inner join usuario u on c.idusuario = u.idusuario where idgerente =  " + idGerente;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}

function inserirColaborador(idUser, idGerente, callback) {
    var query = "INSERT INTO colaborador( idgerente, idusuario) " +
        " VALUES (" + idGerente + "," + idUser + ");";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel inserir o Colaborador");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true, "Coladador inserido com sucesso");
        return;
    });

}
// TODO
function buscarReservasRestaurante(idRestaurante, callback) {
    var query = "select * from colaborador c inner join usuario u on c.idusuario = u.idusuario where idgerente =  " + idGerente;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}
exports.buscarReservasRestaurante = buscarReservasRestaurante;


exports.inserirColaborador = inserirColaborador;
exports.buscarColaboradoresGerentes = buscarColaboradoresGerentes;
exports.isColaborador = isColaborador;
exports.isGerente = isGerente;
exports.buscarRestauranteIdUserFuncionario = buscarRestauranteIdUserFuncionario;
exports.inserirRestaurante = inserirRestaurante;