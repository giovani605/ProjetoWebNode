var express = require('express');
var app = express();

app.get('/teste', function (req, res) {
    console.log("teste funcionando");
    res.status(200).send("oi");
})
app.listen(3000, function () {
    console.log("oiii");
});

const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'k2so',
    host: '200.134.10.32',
    database: 'k2so',
    password: '@k2so#',
    port: 5432,
});
pool.query('SELECT * from k2so.teste', (err, res) => {
    console.log(res.rows);
    pool.end();
})

