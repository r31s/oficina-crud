-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS cadastro_site;
USE cadastro_site;

-- Cria a tabela clientes
CREATE TABLE IF NOT EXISTS clientes (
    cpf VARCHAR(11) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(15)
);

-- Cria a tabela carros
CREATE TABLE IF NOT EXISTS carros (
    placa VARCHAR(10) PRIMARY KEY,
    modelo VARCHAR(100),
    marca VARCHAR(100),
    cpf_cliente VARCHAR(11),
    FOREIGN KEY (cpf_cliente) REFERENCES clientes(cpf) ON DELETE SET NULL
);