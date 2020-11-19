const express = require('express'); //cria o express que é usado para criar rotas
const app = express(); //chama a funcão express, é como um construtor
const json = require('body-parser'); //converte os body das APIs para JSON

app.use(json());//chama o construtor body parser 

app.get('/', async(req,res) => { //faz uma chamada de API, (rota, função sincrona que recebe 2 valores, o valor da requisição é o body e o result)
    res.status(200).send({message: 'foi'}) //as rotas determinam qual função do back-end vai ser executada
})

app.all('*', async (req, res) => {
  console.log("pena"); //se não achasse a rota printaria "pena"
});

exports.app = app; //motivo de usar app.app no index