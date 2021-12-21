const express = require('express');
const router = express.Router();
const mysql = require ('../mysql').pool;

//Inseri um emprestimo
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO EMPRESTIMO(retirada, devolucao, USUARIO_CPF) VALUES (?,?,?);',
            [req.body.retirada, req.body.devolucao, req.body.user_cpf],
            (error, resultado, field) =>{
                conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });                    
                }

                res.status(201).send({
                    mensagem: 'Pedido de empréstimo bem sucedido',
                    idEMPRESTIMO: resultado.insertId                    
                });
            }
        )
    });
});

router.post('/:idEMPRESTIMO', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO EMPRESTIMO_LIVRO(EMPRESTIMO_idEMPRESTIMO, LIVRO_idLIVRO) VALUES (?,?);',
            [req.params.idEMPRESTIMO, req.body.idLIVRO],
            (error, resultado, field) =>{
                conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });                    
                }

                res.status(201).send({
                    mensagem: 'Pedido de empréstimo bem sucedido'                                       
                });
            }
        )
    });
});

//Exclui um emprestimo
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(                       
            'DELETE FROM EMPRESTIMO_LIVRO where EMPRESTIMO_idEMPRESTIMO= ?;',
            [
                req.body.idEMPRESTIMO
            ],            
            (error, resultado, field) =>{
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: error                        
                    });                    
                }                
            }
        )       
    });
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}        
        conn.query(
            'DELETE FROM EMPRESTIMO where idEMPRESTIMO= ?;',
            [
                req.body.idEMPRESTIMO
            ],
            (error, resultado, field) =>{
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: error                        
                    });                    
                }

                res.status(202).send({
                    mensagem: 'Devolução bem sucedida'
                });
            }
        )
    });
    
});


module.exports = router;