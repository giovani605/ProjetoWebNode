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

function inserirComentarioRestaurante(idUsuario, idPrato, nota, comentario, data, callback) {
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

function buscarTodosComentariosPratos(idPrato, callback) {
    var query = "select usuario.idusuario, usuario.nome, comentarios_pratos.* from usuario, comentarios_pratos " + 
    "where comentarios_pratos.cliente_idusuario = usuario.idusuario and comentarios_pratos.pratos_idpratos = " + idPrato + 
    " order by comentarios_pratos.idcomentarios_pratos desc;";
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
        console.log("Selecionado comentários do prato: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
}

function buscarTodosComentariosRestaurante(idRestaurante, callback) {
    var query = "select usuario.idusuario, usuario.nome, comentarios_restaurantes.* from usuario, comentarios_restaurantes " +
    " where comentarios_restaurantes.cliente_idusuario = usuario.idusuario and comentarios_restaurantes.restaurante_idrestaurante = " + idRestaurante +
    " order by comentarios_restaurantes.idcomentario desc;";
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
        console.log("Selecionado comentários do restaurante: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
}

function buscarNotaRestaurante(idRestaurante, callback) {
    var query = "select  coalesce(avg(comentarios_restaurantes.nota),0) " + 
    "from comentarios_restaurantes where comentarios_restaurantes.restaurante_idrestaurante = " + idRestaurante + ";";
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
        console.log("Selecionado comentários do restaurante: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
}

function buscarNotaPrato(idPrato, callback) {
    var query = "select coalesce(avg(comentarios_pratos.nota),0) " + 
    "from comentarios_pratos where comentarios_pratos.pratos_idpratos = " + idPrato + ";";
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
        console.log("Selecionado comentários do restaurante: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
}

