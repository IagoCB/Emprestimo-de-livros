const express = require('express');
const router = express.Router();

//Inseri um emprestimo
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de emprestimo'
    });
});

//Exclui um emprestimo
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de empresti'
    });
});
module.exports = router;