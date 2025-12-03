Oficina CRUD - Projeto de Cadastro de Clientes e Carros
Descrição
Este projeto consiste em um CRUD completo (Create, Read, Update, Delete) para gerenciamento de clientes e carros, desenvolvido com:


Frontend: HTML, CSS, JavaScript


Backend: Node.js com Express


Banco de Dados: MySQL


O sistema permite cadastrar, listar, atualizar e excluir clientes e carros, além de vincular carros a clientes pelo CPF.

Estrutura do Projeto
oficina/
│
├─ backend.js                 # Servidor Node.js com rotas CRUD
├─ package.json               # Dependências do Node.js
├─ public/                    # Pasta de arquivos públicos (frontend)
│   ├─ index.html             # Página inicial
│   ├─ cliente.html           # CRUD de clientes
│   ├─ carros.html            # CRUD de carros
│   ├─ style.css              # Estilo centralizado e apresentável
│   ├─ script_cliente.js      # JS para clientes
│   └─ script_carros.js       # JS para carros
└─ README.md                  # Documentação do projeto


Tecnologias Utilizadas


Node.js: Servidor web e backend


Express: Framework para criar rotas e manipular requisições HTTP


MySQL: Banco de dados relacional


HTML/CSS/JS: Interface do usuário, manipulação do DOM e chamadas AJAX


Fetch API: Comunicação entre frontend e backend



Passo a Passo do Desenvolvimento
1. Configuração do Backend


Criou-se o arquivo backend.js com Node.js e Express.


Configurou a conexão com o MySQL:


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '14082006Luan@',
  database: 'cadastro_site'
});



Criou-se rotas para Clientes:




GET /api/clientes → Lista clientes


POST /api/clientes → Cadastrar cliente


PUT /api/clientes/:cpf → Atualizar cliente


DELETE /api/clientes/:cpf → Excluir cliente




Criou-se rotas para Carros:




GET /api/carros → Lista carros


POST /api/carros → Cadastrar carro


PUT /api/carros/:placa → Atualizar carro


DELETE /api/carros/:placa → Excluir carro




Servidor rodando em http://localhost:3000.



2. Criação do Frontend


Criou-se index.html com botões de navegação para Clientes e Carros.


Criou-se cliente.html , carros.html e pesquisa.html com:




Formulário de cadastro


Tabela para listar dados


Botões de atualizar e excluir


Botão para voltar ao índice




Garantiu-se que todas as tabelas tenham <tbody> para serem preenchidas via JS.



3. Desenvolvimento dos Scripts JS


script_cliente.js:


Função carregarClientes() → Preenche a tabela com dados do backend


Função excluirCliente(cpf) → Remove cliente


Função atualizarCliente(cpf) → Atualiza dados do cliente


Evento submit do formulário → Cadastra cliente




script_carros.js:


Função carregarCarros() → Preenche a tabela de carros


Função excluirCarro(placa) → Remove carro


Função atualizarCarro(placa) → Atualiza dados do carro


Evento submit do formulário → Cadastra carro




Scripts usam fetch para comunicação assíncrona com backend.



4. Estilização (CSS)


Criou-se style.css para:


Centralizar conteúdo


Deixar formulário e tabela visualmente agradáveis


Botões com estilo consistente


Interface responsiva simples





5. Problemas encontrados e resolvidos


Tabela sumindo → Corrigido usando defer ou carregando script no final do <body>.


Erro 404 e MIME type → Garantido que arquivos JS estejam dentro da pasta public.


Erro addEventListener em null → Corrigido garantindo que o DOM estivesse carregado antes do script rodar.


Atualização de dados → Adicionados inputs editáveis nas tabelas e função PUT para enviar mudanças para o backend.



6. Testes


Testado cadastro, listagem, atualização e exclusão de clientes e carros.


Testado fluxo completo de CRUD no navegador.


Confirmação de dados diretamente no MySQL.



Como Rodar o Projeto


Instalar dependências:


npm install express mysql2



Criar banco de dados cadastro_site com tabelas clientes e carros:


CREATE TABLE clientes (
  cpf VARCHAR(11) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  telefone VARCHAR(15)
);

CREATE TABLE carros (
  placa VARCHAR(10) PRIMARY KEY,
  modelo VARCHAR(100),
  marca VARCHAR(100),
  cpf_cliente VARCHAR(11),
  FOREIGN KEY (cpf_cliente) REFERENCES clientes(cpf) ON DELETE SET NULL
);



Rodar o servidor:


node server.js



Abrir no navegador:


http://localhost:3000/index.html
