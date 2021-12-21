const express = require('express');
const router = express.Router();
const mysql = require ('../mysql').pool;

//Inseri um livro
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO LIVRO(titulo, autor, USUARIO_CPF) VALUES (?,?,?);',
            [req.body.titulo, req.body.autor, req.body.user_cpf],
            (error, resultado, field) =>{
                conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });                    
                }

                res.status(201).send({
                    mensagem: 'Livro inserido com sucesso',
                    idLIVRO: resultado.insertId                    
                });
            }
        )
    });
});

module.exports = router;