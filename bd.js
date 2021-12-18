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

//exportando módulos
module.exports = {insertUser, selectUser}
