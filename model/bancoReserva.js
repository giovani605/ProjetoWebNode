const Banco = require("./bancoDados");
const conexao = Banco.conexao;


function buscarReservasPorRestaurante(idrestaurante, callback) {
    var query = "select reservas.idreserva, reservas.data_reserva, reservas.idpromocao, pratos.nome as nomePrato, pratos.idimagem, pratos.descricao, restaurante.idrestaurante, restaurante.nome as nomeRestaurante " +
        "from reservas, pratos, restaurante  where restaurante.idrestaurante = pratos.restaurante_idrestaurante and pratos.idpratos = reservas.idprato " +
        "and restaurante.idrestaurante = " + idrestaurante + " ;";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, "Não foi possivel buscar as reservas do usuário");
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows);
        return;
    });



}
exports.buscarReservasPorRestaurante = buscarReservasPorRestaurante;



function buscarReservasPorUsuario(idUser, callback) {
    // reservas.data_reserva >= date_trunc('day',now()) and 
    var query = "select reservas.idreserva, reservas.data_reserva, reservas.idpromocao, pratos.nome as nomePrato, pratos.idimagem, pratos.descricao, restaurante.idrestaurante, restaurante.nome as nomeRestaurante " +
        "from reservas, pratos, restaurante  where restaurante.idrestaurante = pratos.restaurante_idrestaurante and pratos.idpratos = reservas.idprato " +
        "and reservas.idusuario = " + idUser + " ;";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, "Não foi possivel buscar as reservas do usuário");
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows);
        return;
    });

} exports.buscarReservasPorUsuario = buscarReservasPorUsuario;

function validaPromocao(idPrato, codigo, callback) {

    var query = "select promocao.promocaoid from promocao where codigo = '" + codigo +
        "' and promocao.idprato = " + idPrato + " limit 1;";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel buscar as promoções");
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

} exports.validaPromocao = validaPromocao;

function inserirReserva(idPrato, IdUser, data_reserva, codigo, callback) {
    console.log("codigo " + codigo);
    if (codigo == null || codigo == "") {
        insertReservaSQL(idPrato, IdUser, data_reserva, null, callback);
        return;
    }

    validaPromocao(idPrato, codigo, (res, flag) => {
        if (!flag) {
            callback("Código Inválido", false);
            return;
        }
        insertReservaSQL(idPrato, IdUser, data_reserva, res["promocaoid"], callback);
    });

}
exports.inserirReserva = inserirReserva;
function insertReservaSQL(idPrato, idUsuario, data, idPromocao, callback) {

    var query = "insert into reservas (idprato, idusuario, data_reserva, idpromocao) values (" + idPrato +
        ", " + idUsuario + ", '" + data;
    if (idPromocao == null) {
        query = query + "', null );";
    } else {
        query = query + "', " + idPromocao + " );";
    }
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback("Não foi inserir no banco", false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

} exports.validaPromocao = validaPromocao