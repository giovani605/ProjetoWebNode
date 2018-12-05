const Banco = require("./bancoDados");
const conexao = Banco.conexao;

function inserirComentarioPrato(idUsuario, idPrato, nota, comentario, callback) {
    var query = "insert into k2so.comentarios_pratos(cliente_idusuario, pratos_idpratos, nota, comentario, data) " + 
    "values (" + idUsuario + ", " + idPrato + ", " + nota + ", '" + comentario + "', now());";    
    
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel inserir comentário de prato");
            return;
        }
        console.log("Inserido comentário de prato: ");
        console.log(res);
        callback(res, true);

    });
} exports.inserirComentarioPrato = inserirComentarioPrato;

function inserirComentarioRestaurante(idUsuario, idPrato, nota, comentario, callback) {
    var query = "insert into k2so.comentarios_restaurantes(cliente_idusuario, restaurante_idrestaurante, nota, comentario, data) " + 
    "values (" + idUsuario + ", " + idPrato + ", " + nota + ", '" + comentario + "', now());";    
    console.log("Querry de inserir");
    
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel inserir comentário de restaurante");
            return;
        }
        console.log("Inserido comentário de restaurante: ");
        console.log(res);
        callback(res, true);

    });
}exports.inserirComentarioRestaurante = inserirComentarioRestaurante;

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
}exports.buscarTodosComentariosPratos = buscarTodosComentariosPratos;

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
} exports.buscarTodosComentariosRestaurante = buscarTodosComentariosRestaurante;

function buscarNotaRestaurante(idRestaurante, callback) {
    var query = "select  coalesce(avg(comentarios_restaurantes.nota),0) as media " + 
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
        console.log("Selecionado média do restaurante: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
} exports.buscarNotaRestaurante = buscarNotaRestaurante;

function buscarNotaPrato(idPrato, callback) {
    var query = "select coalesce(avg(comentarios_pratos.nota),0) as media " + 
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
        console.log("Selecionado média do prato: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
} exports.buscarNotaPrato = buscarNotaPrato;

function totalSeguidoresRestaurante(idRestaurante, callback) {
    var query = "select count(seguir.usuario_idusuario) as total from seguir where restaurante_idrestaurante = " + idRestaurante + ";";
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
        console.log("Retornando o total de seguidores: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
} exports.totalSeguidoresRestaurante = totalSeguidoresRestaurante;

function totalAvaliacoesRestaurante(idRestaurante, callback) {
    var query = "select count(comentarios_restaurantes.idcomentario) as total from comentarios_restaurantes where comentarios_restaurantes.restaurante_idrestaurante = " + idRestaurante + ";";
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
        console.log("Retornando o total de avaliações de restaurante: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
} exports.totalAvaliacoesRestaurante = totalAvaliacoesRestaurante;

function totalAvaliacoesPrato(idPrato, callback) {
    var query = "select count(comentarios_pratos.idcomentarios_pratos) as total from comentarios_pratos where comentarios_pratos.pratos_idpratos = " + idPrato + ";";
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
        console.log("Retornando o total de avaliações do prato: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
} exports.totalAvaliacoesPrato = totalAvaliacoesPrato;