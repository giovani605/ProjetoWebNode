const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;
var formatarData = Banco.formatarData;

// implementacao do feed inicial
function feedGeral(callback){
    var query = "select * from prato_dia pd inner join pratos p on p.idpratos = pd.idprato ";
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if(res.rows.length == 0){
            callback(res.rows, false);
            return;
        }
        console.log("Selecionado pratos : ");
       // console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}
exports.feedGeral = feedGeral;