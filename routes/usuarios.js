const express = require('express');
const router = express.Router();

//Inseri um usuario
router.post('/', (req, res, next) => {
    const user = {
        cpf: req.body.cpf,
        nome: req.body.nome,
        email: req.body.email,
        endereco: req.body.endereco,
        telefone: req.body.telefone
    }
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de usuarios',
        usuarioCriado: user
    });
});

//Retorna os dados de um usuario
router.get('/:cpf', (req, res, next) => {
    const cpf = req.params.cpf
    res.status(200).send({
        mensagem: 'Usando o GET de um usuario',
        cpf: cpf
    });
});

module.exports = router;