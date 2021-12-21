const express = require('express');
const router = express.Router();
const mysql = require ('../mysql').pool;

//Inseri um usuario
router.post('/', (req, res, next) => {   

    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO usuario(CPF, nome, email, endereco, telefone) VALUES (?,?,?,?,?);',
            [req.body.cpf, req.body.nome, req.body.email, req.body.endereco, req.body.telefone],
            (error, resultado, field) =>{
                conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });                    
                }

                res.status(201).send({
                    mensagem: 'Usuario inserido com sucesso'                    
                });
            }
        )
    });
    
});

//Retorna os dados de um usuario
router.get('/:cpf', (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM usuario WHERE CPF = ?;',
            [req.params.cpf],
            (error, resultado, fields) => {
                if(error){return res.status(500).send({ error: error })}
                return res.status(200).send({respinse: resultado})
            }
        )

    });
});

module.exports = router;