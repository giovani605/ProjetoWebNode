// apenas para nao ficar tudo em uma arquivo do banco

const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;


function inserirRestaurante(idGerente, dadosRestaurante, callback) {
    console.log("desc: " + inserirAspas(dadosRestaurante["descricao"]));

    var query = "INSERT INTO restaurante(gerente_idgerente," +
        "cidades_id, nome, descricao,telefone, rua, numero) " +
        "VALUES(" + idGerente + ",1," + inserirAspas(dadosRestaurante["nome"]) + "," +
        inserirAspas(dadosRestaurante["descricao"]) +
        "," + inserirAspas(dadosRestaurante["telefone"])+
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

function buscarRestauranteIdUser(idUser, callback){
    var query = "SELECT r.* FROM restaurante r inner join gerente g on g.idgerente = r.gerente_idgerente "+
    "inner join usuario u on u.idusuario = g.usuario_idusuario where u.idusuario = " + idUser ;
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

exports.inserirRestaurante = inserirRestaurante;