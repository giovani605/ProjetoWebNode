const Banco = require("./bancoDados");
const conexao = Banco.conexao;

function buscarReservasPorUsuario(idUser, callback) {

    var query = "select reservas.idreserva, reservas.data, reservas.idpromocao, pratos.nome as nomePrato, pratos.idimagem, pratos.descricao, restaurante.idrestaurante, restaurante.nome as nomeRestaurante " + 
        "from reservas, pratos, restaurante    where restaurante.idrestaurante = pratos.restaurante_idrestaurante and pratos.idpratos = reservas.idprato " + 
        "and reservas.data >= date_trunc('day',now()) and reservas.idusuario = " + idUser + " ;";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, "Não foi possivel buscar as reservas do usuário");
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows);
        return;
    });

} exports.buscarReservasPorUsuario = buscarReservasPorUsuario;