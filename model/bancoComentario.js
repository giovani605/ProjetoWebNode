const Banco = require("./bancoDados");
const conexao = Banco.conexao;

function inserirComentarioPrato(idUsuario, idPrato, nota, comentario, data, callback) {
    var query = "insert into k2so.comentarios_pratos(cliente_idusuario, pratos_idpratos, nota, comentario, data) " + 
    "values (" + idUsuario + ", " + idPrato + ", " + nota + ", '" + comentario + "', '" + data + "');";    
    
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel inserir comentário de prato");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true);

    });
}

function inserirComentarioPrato(idUsuario, idPrato, nota, comentario, data, callback) {
    var query = "insert into k2so.comentarios_restaurantes(cliente_idusuario, restaurante_idrestaurante, nota, comentario, data) " + 
    "values (" + idUsuario + ", " + idPrato + ", " + nota + ", '" + comentario + "', '" + data + "');";    
    
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel inserir comentário de restaurante");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true);

    });
}

function buscarUltimosComentariosPratos(idPrato, callback) {
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