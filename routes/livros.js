const express = require('express');
const router = express.Router();

//Inseri um livro
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de livros'
    });
});

module.exports = router;