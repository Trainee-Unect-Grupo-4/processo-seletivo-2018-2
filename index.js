const express = require('express');
const bodyParser = require('body-parser'); //transforma em objeto
const server = express();
const porta = 3000;

server.set('view engine', 'ejs');

server.use(bodyParser.urlencoded({extend:true}));
server.use(bodyParser.json());

server.get('/', function(req,res){
    res.render("index");
});

server.post('/criar' , function(req,res){
    res.render("resposta", req.body);
});

server.listen(porta, function(err){
    if(err){
        return console.log("Erro no servidor");
    }
    console.log("Servidor com express rodando na porta: " + porta);
})