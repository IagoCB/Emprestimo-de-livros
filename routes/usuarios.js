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

                const response ={
                    mensagem: 'Usuario cadastrado com sucesso',
                    usuarioCriado: {
                        cpf: req.body.cpf,
                        nome: req.body.nome,
                        email: req.body.email,
                        endereco: req.body.endereco,
                        telefone: req.body.telefone,
                        request:{
                            tipo: 'GET',
                            descricao: 'Buscar informações de um usuário específico',
                            url: 'http://localhost:3000/usuarios/' + req.body.cpf
                        }
                    }
                }

                return res.status(201).send(response);
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

                if(resultado.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado um usuário com esse cpf'
                    })
                }

                const response ={
                    mensagem: 'Informações do usuário',
                    usuario: {
                        cpf: req.params.cpf,
                        nome: resultado[0].nome,
                        email: resultado[0].email,
                        endereco: resultado[0].endereco,
                        telefone: resultado[0].telefone,
                        request:{
                            tipo: 'POST',
                            descricao: 'Cadastrar um novo usuário',
                            url: 'http://localhost:3000/usuarios',
                            body:{
                                cpf: "CHAR(12)",
                                nome: "VARCHAR",
                                email: "VARCHAR",
                                endereco: "VARCHAR",
                                telefone: "VARCHAR"
                            } 
                        }
                    }
                }

                return res.status(200).send(response);                
            }
        )

    });
});

module.exports = router;