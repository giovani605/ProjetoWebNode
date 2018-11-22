// apenas para nao ficar tudo em uma arquivo do banco

const Banco = require("./bancoDados");
const conexao = Banco.conexao;

// aqui faz as query
function bancoTeste(callback){
    conexao.query('SELECT * from teste', (err, res) => {
        console.log("Banco : ");
        console.log(res.rows);
    });
}


// exporta elas