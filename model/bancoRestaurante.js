// apenas para nao ficar tudo em uma arquivo do banco

const Banco = require("./bancoDados");
const conexao = Banco.conexao;
var inserirAspas = Banco.inserirAspas;

function buscarRestauranteIdRestaurante(idRestaurante, callback) {
    var query = "SELECT * FROM restaurante where idrestaurante = " + idRestaurante;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows[0]);
        callback(res.rows[0], true);
        return;
    });


}
exports.buscarRestauranteIdRestaurante = buscarRestauranteIdRestaurante;

function aprovarSimples(idPratoDia, callback) {
    var query = "update prato_dia  set aprovado=1 where idprato_dia = " + idPratoDia;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res);
        callback(res, true);
        return;
    });

}
exports.aprovarSimples = aprovarSimples;

function aprovarPeriodo(idPeriodo, callback) {
    var query = "update periodo_ciclo  set aprovado=true where idperiodo = " + idPeriodo + ";";
    query += "update prato_dia  set aprovado=1 where idperiodo = " + idPeriodo + ";";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res);
        callback(res, true);
        return;
    });

}
exports.aprovarPeriodo = aprovarPeriodo;





function inserirRestaurante(idGerente, dadosRestaurante, callback) {
    console.log("desc: " + inserirAspas(dadosRestaurante["descricao"]));

    var query = "INSERT INTO restaurante(gerente_idgerente," +
        "cidades_id, nome, descricao,telefone, rua, numero) " +
        "VALUES(" + idGerente + "," + dadosRestaurante["cidades_id"] + "," + inserirAspas(dadosRestaurante["nome"]) + "," +
        inserirAspas(dadosRestaurante["descricao"]) +
        "," + inserirAspas(dadosRestaurante["telefone"]) +
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

function buscarRestauranteIdUser(idUser, callback) {
    var query = "SELECT r.*,g.idgerente FROM restaurante r inner join gerente g on g.idgerente = r.gerente_idgerente " +
        "inner join usuario u on u.idusuario = g.usuario_idusuario where u.idusuario = " + idUser;
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

function buscarRestauranteIdUserFuncionario(idUser, callback) {
    var query = "SELECT r.*,g.idgerente FROM restaurante r inner join gerente g on g.idgerente = r.gerente_idgerente " +
        "inner join colaborador u on u.idgerente = g.idgerente where u.idusuario = " + idUser;
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

function isColaborador(idUser, callback) {
    var query = "SELECT * FROM colaborador where idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows[0]);
        callback(res.rows[0], true);
        return;
    });
}
function isGerente(idUser, callback) {
    var query = "SELECT * FROM gerente where usuario_idusuario = " + idUser;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows[0]);
        callback(res.rows[0], true);
        return;
    });
}
function buscarColaboradoresGerentes(idGerente, callback) {
    var query = "select * from colaborador c inner join usuario u on c.idusuario = u.idusuario where idgerente =  " + idGerente;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}

function inserirColaborador(idUser, idGerente, callback) {
    var query = "INSERT INTO colaborador( idgerente, idusuario) " +
        " VALUES (" + idGerente + "," + idUser + ");";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Não foi possivel inserir o Colaborador");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true, "Coladador inserido com sucesso");
        return;
    });

}
// TODO
function buscarReservasRestaurante(idRestaurante, callback) {
    var query = "select * from colaborador c inner join usuario u on c.idusuario = u.idusuario where idgerente =  " + idGerente;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}
exports.buscarReservasRestaurante = buscarReservasRestaurante;




// TODO
function buscarPratoDiaAprovarCiclo(idRestaurante, callback) {
    var query = "select pd.*,p.*,u.login from periodo_ciclo pd inner join pratos p " +
        " on pd.pratoid= p.idpratos inner join restaurante r on " +
        " r.idrestaurante = p.restaurante_idrestaurante " +
        " inner join usuario u on u.idusuario = pd.responsavel " +
        " where  r.idrestaurante = " + idRestaurante + " and pd.aprovado = false;"
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}
exports.buscarPratoDiaAprovarCiclo = buscarPratoDiaAprovarCiclo;



// TODO
function buscarPratoDiaSimplesAprovar(idRestaurante, callback) {
    var query = "select pd.*,p.*,u.login from prato_dia pd inner join pratos p " +
        " on pd.idprato = p.idpratos inner join restaurante r on " +
        " r.idrestaurante = p.restaurante_idrestaurante " +
        " inner join usuario u on u.idusuario = pd.responsavel where " +
        " r.idrestaurante = " + idRestaurante + " and pd.aprovado = 0;";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });

}
exports.buscarPratoDiaSimplesAprovar = buscarPratoDiaSimplesAprovar;


function buscarPratoNome(nome, callback) {
    var query = "select p.*,r.nome rnome from pratos p inner join" +
        " restaurante r on p.restaurante_idrestaurante = r.idrestaurante where p.nome like " + inserirAspas(nome + "%") + ";";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
}
exports.buscarPratoNome = buscarPratoNome;


function buscarRestauranteNome(nome, callback) {
    var query = "select * from restaurante where nome like " + inserirAspas(nome + "%") + ";";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
}
exports.buscarRestauranteNome = buscarRestauranteNome;

function pesquisarPratoRestaurante(nome, callback) {
    buscarPratoNome(nome, (dados, flag) => {
        buscarRestauranteNome(nome, (res, flag) => {
            callback(dados, res, flag);
        });
    });
}
exports.pesquisarPratoRestaurante = pesquisarPratoRestaurante;

function inserirCodigoPromocaoSql(codigo, idGerente, idprato, callback) {
    var query = "INSERT INTO promocao(descricao, valida, codigo, idgerente, idprato) " +
        "VALUES ('promocao', 1," + inserirAspas(codigo) + "," + idGerente + "," + idprato + ");";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "Codigo ao inserir o codigo");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true, "Codigo inserido com sucesso");
        return;
    });
}
exports.inserirCodigoPromocaoSql = inserirCodigoPromocaoSql;

// TODO
function seguirRestaurante(idUser, idRestaurante, callback) {

    var query = "INSERT INTO seguir(usuario_idusuario, restaurante_idrestaurante) " +
        "VALUES (" + idUser + "," + idRestaurante + ");";
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false, "seguirRestaurante falha");
            return;
        }
        console.log("Inserido : ");
        console.log(res);
        callback(res, true, "Seguir resturante com sucesso");
        return;
    });


}
exports.seguirRestaurante = seguirRestaurante;

function buscarCodigosIdRestaurante(idRestaurante, callback) {
    var query = "select p.codigo,pt.nome from promocao p inner join" +
        " pratos pt on pt.idpratos = p.idprato where pt.restaurante_idrestaurante =  " + idRestaurante;
    console.log(query);
    conexao.query(query, (err, res) => {
        if (err) {
            console.log("problemas : ");
            console.log(err);
            callback(err, false);
            return;
        }
        if (res.rows.length == 0) {
            console.log("Resultado : ");
            console.log(res.rows);
            callback(res.rows, false);
            return;
        }
        console.log("Resultado : ");
        console.log(res.rows);
        callback(res.rows, true);
        return;
    });
}
exports.buscarCodigosIdRestaurante = buscarCodigosIdRestaurante;


exports.inserirColaborador = inserirColaborador;
exports.buscarColaboradoresGerentes = buscarColaboradoresGerentes;
exports.isColaborador = isColaborador;
exports.isGerente = isGerente;
exports.buscarRestauranteIdUserFuncionario = buscarRestauranteIdUserFuncionario;
exports.inserirRestaurante = inserirRestaurante;