//criando uma função assíncrona genérica
(async () => {  
  //chamando a conecxao com o banco de dados
  const db = require("./bd")
  console.log("Começou");

  //criando uma constante e fazendo uma requisição de um pacote para a entrada de dados 
  const entrada = require('prompt-sync')({sigint: true});
    
  //inserindo um usuário
  console.log("Vamos inserir um usuario!");
  var cpf = entrada('Digite o cpf(somente números): ');
  var nome = entrada("Digite o nome: ");
  var email = entrada("Digite o email: ");
  var endereco = entrada("Digite o endereco: ");
  var telefone = entrada("Digite o telefone: ");
  await db.insertUser({cpf: cpf, nome:  nome, email: email, endereco: endereco, telefone:  telefone});

  //buscando um usuário
  console.log("Vamos buscar um usuario!");
  var cpf_select = entrada("Digite um CPF: ");
  var user = await db.selectUser(cpf_select);    
  console.log(user);
  
})();