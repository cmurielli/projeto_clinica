const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const connect = require('../database/connect');
const Hash = require('../services/hash');


  router.post(
    '/signin',
    [
      body('email').isEmail().withMessage('E-mail deve ser válido'),
      body('password').trim().notEmpty().withMessage('Você deve digitar uma senha'),
    ],
    [],
    async (req, res, next) => {
      try{
        connect.createTables();
        const {email, password} = req.body;
        const stmts = "";
        let existingEstabelecimento = await connect.select(stmts);
        existingEstabelecimento = existingEstabelecimento[0];
        console.log(existingEstabelecimento)

        if (!existingEstabelecimento) {
          return res.status(404).send({mensagem: "Estabelecimento não existente"});
        }
        console.log(existingEstabelecimento.SENHA)
        const passwordsMatch = await Hash.compare(existingEstabelecimento.SENHA, password);

        if (!passwordsMatch) {
          return res.status(401).send({mensagem: "Senha inválida"});
        }

        existingEstabelecimento.splice(existingEstabelecimento.indexOf('SENHA'), 1);

        return res.status(200).send(existingEstabelecimento);

      }catch(err){
        return res.status(500).send({message: err})
      }
  });

  module.exports = router;