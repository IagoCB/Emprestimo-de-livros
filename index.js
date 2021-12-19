//criando uma função assíncrona genérica
(async () => {  
  //chamando a conecxao com o banco de dados
  const db = require("./bd")
  console.log("Começou");

  //criando uma constante e fazendo uma requisição de um pacote para a entrada de dados 
  const entrada = require('prompt-sync')({sigint: true});
    
  //inserindo um usuário
  console.log("Vamos cadastrar um usuario!");
  var cpf = entrada("Digite o cpf (somente números): ");
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

  //inserindo um livro
  console.log("Vamos cadastrar um livro!");
  var titulo = entrada("Digite o titulo: ");
  var autor = entrada("Digite o autor: ");
  var user_cpf = entrada("Digite o cpf do dono: ");
  await db.insertLivro({titulo: titulo, autor:  autor, user_cpf: user_cpf});

  //inserindo um emprestimo
  console.log("Vamos fazer um empréstimo!");
  var retirada = entrada("Digite a data e a hora da retirada (YYYY-MM-DD hh:mm:ss): ");
  var devolucao = entrada("Digite a data e a hora da devolução (YYYY-MM-DD hh:mm:ss): ");
  var user_cpf = entrada("Digite o cpf do realizador: ");
  await db.insertEmp({retirada: retirada, devolucao:  devolucao, user_cpf: user_cpf});

  //inserido a ligação entre o pedido do emprestimo e qual livro será
  var idEMP = entrada("Digite o código do empréstimo: ");
  var cpfEMP = entrada("Digite o cpf do realizador: ");
  var idLIVRO = entrada("Digite o código do livro: ");
  var cpfLIVRO = entrada("Digite o cpf do dono do livro: ");
  await db.insertLigacao({idEMP: idEMP, cpfEMP:  cpfEMP, idLIVRO: idLIVRO, cpfLIVRO: cpfLIVRO});

  
})();