const app = require('./app');//arquivo com rotas atribuidas

const start = async () => { //pegar a function app e coloca ela pra ouvir a porta 3001, quando isso acontece é printado no server 
    app.app.listen(3001, function () {
      console.log('Updated : Server listening at port %d', 3001);
    }); 
};

start();