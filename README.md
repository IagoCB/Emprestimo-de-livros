<h1 align="center">📚 Empréstimo de Livros </h1>

<h2 align="center">Conteúdo</h2>
<p align="center"><a href="#Descrição">📝 Descrição</a> • <a href="#Requisitos">📥 Requisitos</a> • <a href="#Como-executar">🧩 Como executar</a></p>

# 📝 Descrição <a name="Descrição"></a>

O projeto, para o processo seletivo da empresa Nouvenn, consiste na implementação de uma aplicação para empréstimo de livros na qual é possível realizar cinco funcionalidades básicas:
<br>

1. Cadastrar um novo usuário;
2. Cadastrar um livro novo para um usuário;
3. Emprestar um livro para outros usuários;
4. Devolver um livro;
5. Acessar informações de um usuário;

# 📥 Requisitos <a name="Requisitos"></a>
1. Instalar o [Node.JS](https://nodejs.org/en/download/).
2. Instalar o [MySQL](https://dev.mysql.com/downloads/installer/).
3. Foi utilizado o [Postman](https://www.postman.com/downloads/) para realizar os testes e as requisições.
4. Utilizei o [Visual Studio Code](https://code.visualstudio.com/) mas também é possível utilizar outro editor de sua preferência.

## 🧩 Como executar <a name="Como-executar"></a>
1. Utilizando o terminal do Git Bash, clone o repositório em sua máquina através do seguinte comando:
    ```
    $ git clone https://github.com/IagoCB/Emprestimo-de-livros.git
    ```

2. No diretório do projeto, utilize o comando a seguir para instalar as dependências:
    ```
    npm install
    ```

3. Execute o banco de dados `bd_emprestimo_livros.sql` e confira as requisições no `nodemon.js`.

4. No diretório do projeto, utilize o comando a seguir para executar a aplicação:
    ```
    npm start
    ```

5. Analise e teste a API REST da aplicação atráves do Postman, executando as requisições. Seguem os testes realizados via JSON link: 
    ```
    https://www.getpostman.com/collections/2ce12a59e01abe4036f0
    ```
    Segue um [material](https://github.com/eliasnogueira/postman-collection-automacao-testes-api-v1) explicativo para realizar a importação. 
