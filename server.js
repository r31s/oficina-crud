// backend.js
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '14082006Luan@',
  database: 'cadastro_site'
});

db.connect(err => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    process.exit();
  }
  console.log('✅ Conectado ao MySQL com sucesso!');
});

// ================== ROTAS ==================

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ----------- ROTAS CARROS -----------

// Listar todos os carros
app.get('/api/carros', (req, res) => {
  const sql = 'SELECT * FROM carros';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar carros");
    }
    res.json(results);
  });
});

// Cadastrar carro
app.post('/api/carros', (req, res) => {
  const { placa, modelo, marca, cpf_cliente } = req.body;

  if (!placa || placa.trim() === "") return res.status(400).send("Placa é obrigatória");

  const sql = 'INSERT INTO carros (placa, modelo, marca, cpf_cliente) VALUES (?, ?, ?, ?)';
  db.query(sql, [placa, modelo || null, marca || null, cpf_cliente || null], (err, result) => {
    if (err) {
      console.error(err);
      if (err.code === 'ER_DUP_ENTRY') return res.status(400).send("Placa já cadastrada");
      return res.status(500).send("Erro ao cadastrar carro");
    }
    res.status(201).send("Carro cadastrado com sucesso!");
  });
});

// Atualizar carro
app.put('/api/carros/:placa', (req, res) => {
  const { placa } = req.params;
  const { modelo, marca, cpf_cliente } = req.body;

  const sql = 'UPDATE carros SET modelo=?, marca=?, cpf_cliente=? WHERE placa=?';
  db.query(sql, [modelo || null, marca || null, cpf_cliente || null, placa], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao atualizar carro");
    }
    if (result.affectedRows === 0) return res.status(404).send("Carro não encontrado");
    res.send("Carro atualizado com sucesso!");
  });
});

// Excluir carro
app.delete('/api/carros/:placa', (req, res) => {
  const { placa } = req.params;
  const sql = 'DELETE FROM carros WHERE placa = ?';
  db.query(sql, [placa], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao excluir carro");
    }
    if (result.affectedRows === 0) return res.status(404).send("Carro não encontrado");
    res.send("Carro excluído com sucesso!");
  });
});

// ----------- ROTAS CLIENTES -----------

// Listar clientes
app.get('/api/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar clientes");
    }
    res.json(results);
  });
});

// Cadastrar cliente
app.post('/api/clientes', (req, res) => {
  const { cpf, nome, email, telefone } = req.body;
  if (!cpf || !nome) return res.status(400).send("CPF e nome são obrigatórios");

  const sql = 'INSERT INTO clientes (cpf, nome, email, telefone) VALUES (?, ?, ?, ?)';
  db.query(sql, [cpf, nome, email || null, telefone || null], (err, result) => {
    if (err) {
      console.error(err);
      if (err.code === 'ER_DUP_ENTRY') return res.status(400).send("CPF já cadastrado");
      return res.status(500).send("Erro ao cadastrar cliente");
    }
    res.status(201).send("Cliente cadastrado com sucesso!");
  });
});

// Atualizar cliente
app.put('/api/clientes/:cpf', (req, res) => {
  const { cpf } = req.params;
  const { nome, email, telefone } = req.body;

  const sql = 'UPDATE clientes SET nome=?, email=?, telefone=? WHERE cpf=?';
  db.query(sql, [nome, email || null, telefone || null, cpf], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao atualizar cliente");
    }
    if (result.affectedRows === 0) return res.status(404).send("Cliente não encontrado");
    res.send("Cliente atualizado com sucesso!");
  });
});

// Excluir cliente
app.delete('/api/clientes/:cpf', (req, res) => {
  const { cpf } = req.params;
  const sql = 'DELETE FROM clientes WHERE cpf = ?';
  db.query(sql, [cpf], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao excluir cliente");
    }
    if (result.affectedRows === 0) return res.status(404).send("Cliente não encontrado");
    res.send("Cliente excluído com sucesso!");
  });
});

// ================== INICIAR SERVIDOR ==================
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
