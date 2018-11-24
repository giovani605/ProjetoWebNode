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




function buscarUsuarioLogin(login, callback) {
    var query = "select * from usuario where login =" + inserirAspas(login);
    console.log(query);
    conexao.query(query, (err, res) => {
        console.log("Banco : ");
        console.log(res.rows[0]);
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




exports.buscarTodosUser = buscarTodosUser;
exports.InserirUser = InserirUser;
exports.buscarUsuarioLogin = buscarUsuarioLogin;


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