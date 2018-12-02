// apenas para nao ficar tudo em uma arquivo do banco

const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;

// aqui faz as query
function buscarTodosUser(callback) {
    conexao.query('select * from usuario', (err, res) => {
        console.log("Banco : ");
        console.log(res.rows);
        callback(callback);
    });
}

function buscarTodosGerentes(callback) {
    conexao.query('select * from gerente', (err, res) => {
        console.log("Banco : ");
        console.log(res.rows);
        callback(callback);
    });
}
exports.buscarTodosGerentes = buscarTodosGerentes;

function buscarGerenteIdUser(idUser, callback) {
    var query = 'select * from gerente where usuario_idusuario = ' + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        console.log("Banco : ");
        console.log(res.rows[0]);
        callback(res.rows[0]);
    });
}
exports.buscarGerenteIdUser = buscarGerenteIdUser;

function buscarUsuarioLoginLike(login, callback) {
    var query = "select * from usuario where login like " + inserirAspas(login + "%");
    console.log(query);
    conexao.query(query, (err, res) => {
        console.log("Banco : ");
        console.log(res.rows);
        if (res.rowCount == null) {
            console.log("a pesquisa retornou vazio, logo 'res.rows[0]' = NULL");
        }
        callback(res.rows);
    });
}
exports.buscarUsuarioLoginLike = buscarUsuarioLoginLike;


function buscarUsuarioLogin(login, callback) {
    var query = "select * from usuario where login =" + inserirAspas(login);
    console.log(query);
    conexao.query(query, (err, res) => {
        console.log("Banco : ");
        console.log(res.rows[0]);
        if (res.rowCount == null) {
            console.log("a pesquisa retornou vazio, logo 'res.rows[0]' = NULL");
        }
        callback(res.rows[0]);
    });
}

// Dados no seguinte formato

function InserirUser(dados, callback) {

    var query = "INSERT INTO usuario(nome, senha, login, cidades_id)" +
        " VALUES (" + inserirAspas(dados["nome"]) + "," + inserirAspas(dados["senha"]) + "," + inserirAspas(dados["login"]) + ",1);";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, "Não foi possivel inserir o Usuario");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, "Usuario inserido com sucesso");
        return;
    });
}

function inserirRelacaoGerente(idUser, callback) {
    var query = "INSERT INTO gerente(usuario_idusuario) VALUES (" + idUser + ");";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, "Não foi possivel inserir o Usuario");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, "Usuario inserido com sucesso");
        return;
    });
}
exports.inserirRelacaoGerente = inserirRelacaoGerente;

function buscarRelacaoGerente(idUser, callback) {
    var query = "select * from gerente where usuario_idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        console.log("Banco : ");
        console.log(res.rows[0]);
        callback(res.rows[0]);
    });

}
exports.buscarRelacaoGerente = buscarRelacaoGerente;


// TODO 
function buscarAmigos(idUser, callback) {
    var query = "select * from amigos a inner join usuario u on  a.usuario_idusuario1 = u.idusuario where usuario_idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, [{}]);
            return;
        }
        console.log("Banco : ");
        console.log(res.rows);
        callback(res.rows);
    });

}
exports.buscarAmigos = buscarAmigos;

// TODO 
function buscarReservas(idUser, callback) {
    var query = "select * from amigos where usuario_idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        console.log("Banco : ");
        console.log(res.rows);
        if (res.rowCount == null) {
            console.log("a pesquisa retornou vazio, logo 'res.rows[0]' = NULL");
        }
        callback(res.rows);
    });

}
exports.buscarReservas = buscarReservas;


function inserirAmigos(idUser1, idUser2, callback) {
    var query = "INSERT INTO amigos(usuario_idusuario, usuario_idusuario1) " +
        " VALUES (" + idUser1 + "," + idUser2 + ") , (" + idUser2 + "," + idUser1 + ");";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true);
        return;
    });



}
exports.inserirAmigos = inserirAmigos;


exports.buscarTodosUser = buscarTodosUser;
exports.InserirUser = InserirUser;
exports.buscarUsuarioLogin = buscarUsuarioLogin;


// notificao 
function inserirNotificacao(dados, callback) {
    var query = "INSERT INTO notificacoes(idusuario, ativo, descricao , idremetente,link) " +
        " VALUES (" + dados["idusuario"] + "," + dados["ativo"] + "," +
        inserirAspas["descricao"] + "," + dados["idremetente"] + "," + inserirAspas(dados["link"])+");"
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true);
        return;
    });
}
function buscarNotificacaoIdUser(idUser, callback) {
    var query = "select * from notificacoes where idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        console.log("Banco : ");
        console.log(res.rows);
        if (res.rowCount == null) {
            console.log("a pesquisa retornou vazio, logo 'res.rows[0]' = NULL");
            callback(res.rows, false);
            return;
        }
        callback(res.rows, true);
    });
}
exports.buscarNotificacaoIdUser = buscarNotificacaoIdUser;
exports.inserirNotificacao = inserirNotificacao;


// NAO TESTADA AINDA
// provavelmete nao vamos usar
// Essa é a funcao completa
/*
function inserirGerenteRestaurante(dadosUser, dadosRestaurante, callback) {
    // insiro o user
    this.InserirUser(dadosUser, (res) => {
        // recuperar informacoes
        this.buscarUsuarioLogin(dadosUser["login"], (resposta) => {
            var idUser = resposta["usuario_idusuario"];
            this.inserirRelacaoGerente(idUser, (resposta2) => {
                buscarRelacaoGerente(idUser, (respostaRelacaoGerente) => {
                    inserirRestaurante(respostaRelacaoGerente["idgerente"], dadosRestaurante, (fim) => {
                        callback({
                            "msg": sucesso,
                            "dados": fim
                        });
                    });
                });
            });

        });
    });


}
exports.inserirGerenteRestaurante = inserirGerenteRestaurante;*/