//função assíncrona de conexão com o banco de dados local
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:root@localhost:3306/mydb");    
    global.connection = connection;
    return connection;
}

//função assíncrona para inserção de um usuário no banco de dados
async function insertUser(user){
    const conn = await connect();
    const sql = 'INSERT INTO usuario(CPF, nome, email, endereco, telefone) VALUES (?,?,?,?,?);';
    const values = [user.cpf, user.nome, user.email, user.endereco, user.telefone];
    await conn.query(sql, values);
}

//função assíncrona para buscar um usuário no banco de dados
async function selectUser(cpf_select){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM usuario WHERE CPF ='+ cpf_select +';'); 
    return rows;    
}

//função assíncrona para inserção de um livro no banco de dados
async function insertLivro(book){
    const conn = await connect();
    const sql = 'INSERT INTO livro(titulo, autor, USUARIO_CPF) VALUES (?,?,?);';
    const values = [book.titulo, book.autor, book.user_cpf];
    await conn.query(sql, values);
}

//função assíncrona para inserção de um empréstimo no banco de dados
async function insertEmp(emp){
    const conn = await connect();
    const sql = 'INSERT INTO EMPRESTIMO(retirada, devolucao, USUARIO_CPF) VALUES (?,?,?);';
    const values = [emp.retirada, emp.devolucao, emp.user_cpf];
    await conn.query(sql, values);
}

//função assíncrona para inserção de uma ligação do pedido de empréstimo com o livro que vai ser emprestado no banco de dados
async function insertLigacao(lig){
    const conn = await connect();
    const sql = 'INSERT INTO EMPRESTIMO_LIVRO(EMPRESTIMO_idEMPRESTIMO, EMPRESTIMO_USUARIO_CPF, LIVRO_idLIVRO, LIVRO_USUARIO_CPF) VALUES (?,?,?,?);';
    const values = [lig.idEMP, lig.cpfEMP, lig.idLIVRO, lig.cpfLIVRO];
    await conn.query(sql, values);
}

//função assíncrona para deletar um pedido de empréstimo do banco de dados (devolução)
async function deleteEmp(idEMP){
    const conn = await connect();
    const sql = 'DELETE FROM EMPRESTIMO where idEMPRESTIMO= ?;';
    return await conn.query(sql, [idEMP]);    
}

//função assíncrona para deletar a ligação entre o pedido de empréstimo e o livro do banco de dados (devolução parte 2)
async function deleteLigacao(idEMP_lig){
    const conn = await connect();
    const sql = 'DELETE FROM EMPRESTIMO_LIVRO where EMPRESTIMO_idEMPRESTIMO= ?;';
    return await conn.query(sql, [idEMP_lig]);    
}

//exportando módulos
module.exports = {insertUser, selectUser, insertLivro, insertEmp, insertLigacao, deleteEmp, deleteLigacao}
