// apenas para nao ficar tudo em uma arquivo do banco

const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;

// aqui faz as query
function buscarTodosUser(callback){
    conexao.query('select * from usuario', (err, res) => {
        console.log("Banco : ");
        console.log(res.rows);
        callback(callback);
    });
}
function buscarUsuarioLogin(login, callback){
    var query = "select * from usuario where login =" + inserirAspas(login);
    console.log(query);
    conexao.query(query, (err, res) => {
        console.log("Banco : ");
        console.log(res.rows[0]);
        callback(res.rows[0]);
    });


}



// Dados no seguinte formato

function InserirUser(dados ,callback){

    var query = "INSERT INTO usuario(nome, senha, login, cidades_id)" +
    " VALUES ("+ inserirAspas(dados["nome"])+ "," + inserirAspas(dados["senha"]) + "," + inserirAspas(dados["login"]) + ",1);";
    console.log(query);
    conexao.query(query, (err, res) => {
        if(err){
            console.log("problemas : ");
            console.log(err);
            callback(err,"Não foi possivel inserir o Usuario");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res,"Usuario inserido com sucesso");
        return;
    });
}


exports.buscarTodosUser = buscarTodosUser;
exports.InserirUser = InserirUser;
exports.buscarUsuarioLogin = buscarUsuarioLogin;
// exporta elas