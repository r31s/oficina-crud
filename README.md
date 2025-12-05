# 🛠️ Guia Rápido para Rodar o Projeto Oficina-CRUD

Este é um guia **resumido e direto** para executar o projeto Oficina-CRUD após clonar o repositório.

---

## 📌 1. Pré-requisitos

Certifique-se de ter instalado no computador:

* **Node.js** (versão 14+)
* **MySQL Server** OU MySQL do XAMPP/WAMP

---

## 📌 2. Clonar o repositório

```bash
git clone https://github.com/r31s/oficina-crud
cd oficina-crud
```

---

## 📌 3. Instalar dependências do projeto

```bash
npm install
```

Se o projeto usar `mysql2`:

```bash
npm install mysql2
```

---

## 📌 4. Configurar o banco de dados MySQL

1. Crie o banco:

```sql
CREATE DATABASE oficina;
```

2. Importe o arquivo **banco.sql** dentro do banco `oficina`.

---

## 📌 5. Ajustar conexão no server.js

No arquivo **server.js**, confirme os dados do MySQL:

```js
host: 'localhost',
user: 'root',
password: '',
database: 'oficina'
```

Ajuste conforme sua instalação.

---

## 📌 6. Iniciar o servidor

```bash
node server.js
```

---

## 📌 7. Acessar no navegador

Abra:

```
http://localhost:3000
```

---

## ✔️ Pronto!

O projeto estará rodando localmente. Se precisar rodar em rede local ou tiver erros, peça ajuda 😉

