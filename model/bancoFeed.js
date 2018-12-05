const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;
var formatarData = Banco.formatarData;

// implementacao do feed inicial
function feedGeral(callback) {
    var query = "select * from prato_dia pd inner join pratos p on p.idpratos = pd.idprato where pd.aprovado = 1 " + " order by dia";
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
        // console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}
function gerarIn(lista) {
    var a = "(";
    for (let b of lista) {
        a += b["idtag"];
        a += ",";
    }
    a += ";";
    a = a.replace(",;", ")");
    console.log(a);
    return a;
}


function feedFiltro(listaTags, idCidade, callback) {
    var query = "select *,p.nome pnome from prato_dia pd inner join  pratos p on pd.idprato = p.idpratos " +
        "inner join restaurante r on r.idrestaurante = p.restaurante_idrestaurante inner join " +
        "( select count(*) conta,pd.idprato_dia from prato_dia pd inner join " +
        " pratos p on p.idpratos = pd.idprato  inner join tag_prato  pt on " +
        " pt.idpratos = p.idpratos  where pt.idtag in " + gerarIn(listaTags) + " group by pd.idprato_dia ) " +
        " a on pd.idprato_dia = a.idprato_dia where r.cidades_id = " + idCidade + " and pd.aprovado = 1 order by pd.dia, a.conta desc;"
    console.log(query);
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
exports.feedFiltro = feedFiltro;

// todo
function feedSeguir(idUser, callback) {
    var query = "select pd.*,r.*,p.nome pnome,p.idimagem,p.restaurante_idrestaurante from prato_dia pd inner join " +
    " pratos p on pd.idprato = p.idpratos  inner join restaurante r on " +
    " r.idrestaurante = p.restaurante_idrestaurante inner join seguir s on " + 
    " s.restaurante_idrestaurante = r.idrestaurante where s.usuario_idusuario = " + idUser +" and pd.aprovado = 1" + " order by dia"; 
    console.log(query);
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
        console.log("Selecionado pratos Dias: ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}
exports.feedSeguir = feedSeguir;


exports.feedGeral = feedGeral;