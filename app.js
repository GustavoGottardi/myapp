var express  = require('express');
// cria nossa aplicação Express
var app = express();
// mongoose for mongodb
var mongoose = require('mongoose');
// solicitações para log no console (express4)
var logger = require('morgan');
// puxar informações por POST HTML (express4)
var bodyParser = require('body-parser');
// simular DELETE e PUT (express4)
var methodOverride = require('method-override');



// conectando ao mongodb no localhost, criando o banco de dados contato
mongoose.connect('mongodb://localhost/contato');
// Requisição ao arquivo que cria nosso model Contato
require('./models/Contato');



// definindo local de arquivos públicos
app.use(express.static(__dirname + '/dist'));
// logando todas as requisições no console
app.use(logger('dev'));
// parse application/x-www-form-urlencoded                                    
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json          
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());



// Incluindo nossas rotas definidas no arquivo routes/routes.js
var index = require('./routes/routes');
// definindo nossas rotas na aplicação
app.use('/', index);



// Define a porta 8080 onde será executada nossa aplicação
app.listen(8080);
// Imprime uma mensagem no console
console.log("Aplicação executada na porta 8080");