const express = require('express');
const router = express.Router();
const mysql = require ('../mysql').pool;

//Inseri um emprestimo
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO EMPRESTIMO(retirada, devolucao, USUARIO_CPF) VALUES (?,?,?)',
            [req.body.retirada, req.body.devolucao, req.body.user_cpf],
            (error, result, field) =>{
                conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });                    
                }

                const response ={
                    mensagem: 'Pedido de emprestimo realizado',
                    pedidoCriado: {                        
                        retirada: req.body.retirada,
                        devolucao: req.body.devolucao,
                        cpf: req.body.user_cpf,                        
                        request:{
                            tipo: 'POST',
                            descricao: 'Infromar qual o livro',
                            url: 'http://localhost:3000/emprestimos/undefined',
                            body:{
                                idLIVRO: 'INT'                                  
                            }
                        }
                    }
                }

                return res.status(201).send(response);                
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

                const response ={
                    mensagem: 'Livro definido',
                    pedidoConcluido: {                        
                        idEMPRESTIMO: req.params.idEMPRESTIMO,
                        idLIVRO: req.body.idLIVRO,                                              
                        request:{
                            tipo: 'POST',
                            descricao: 'Fazer um pedido',
                            url: 'http://localhost:3000/emprestimos',
                            body:{
                                retirada: 'DATETIME',
                                devolucao: 'DATETIME', 
                                user_cpf: 'CHAR(12)'      
                            }
                        }
                    }
                }

                res.status(201).send(response);
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

                const response = {
                    mensagem: 'Devolução bem sucedida',
                    request:{
                        tipo: 'POST',
                        descricao: 'Fazer um pedido',
                        url: 'http://localhost:3000/emprestimos',
                        body:{
                            retirada: 'DATETIME',
                            devolucao: 'DATETIME', 
                            user_cpf: 'CHAR(12)'      
                        }
                    }
                }

                res.status(202).send(response);
            }
        )
    });
    
});


module.exports = router;