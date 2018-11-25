const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;


// corrigir a parte de inserir tag
function inserirPrato(idRestaurante, idImagem, dadosPratos, callback) {
    var query = "INSERT INTO pratos(restaurante_idrestaurante, tag_idtag, idimagem, nome,descricao) " +
        "VALUES(" + idRestaurante + ",1," + inserirAspas(idImagem) + "," +
        inserirAspas(dadosPratos["nome"]) + "," +
        inserirAspas(dadosPratos["descricao"]) + ");"
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err,false,"Não foi possivel inserir o Prato");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res,true, "prato inserido com sucesso");
        return;
    });
}
exports.inserirPrato = inserirPrato;