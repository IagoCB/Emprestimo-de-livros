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

                const response ={
                    mensagem: 'Livro registrado com sucesso',
                    livroRegistrado: {                        
                        titulo: req.body.titulo,
                        autor: req.body.autor,
                        dono: req.body.user_cpf,                        
                        request:{
                            tipo: 'POST',
                            descricao: 'Cadastrar um novo livros',
                            url: 'http://localhost:3000/livros',
                            body:{
                                titulo: "VARCHAR",
                                autor: "VARCHAR",
                                cpf_dono: "CHAR(12)"                                
                            }  
                        }
                    }
                }

                return res.status(201).send(response);
            }
        )
    });
});

module.exports = router;