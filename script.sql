-- Active: 1724686043904@@127.0.0.1@3306@ajuda
-- Script de BD do projeto do TechPix
CREATE DATABASE Techpix;
USE Techpix;

CREATE TABLE empresas(
    id INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(45),
    codigo_empresa VARCHAR(20),
    email VARCHAR(100),
    senha VARCHAR(100),
    cnpj CHAR(14)
);

CREATE TABLE usuarios(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(100),
    senha VARCHAR(100),
    nivel VARCHAR(45),
    cargo VARCHAR(45),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresas(id)
);

INSERT INTO empresas VALUES
(DEFAULT, "Banco Safra", "UFG145R32", "contato_safra@outlook.com", "Teste123%", "12.345.678-33"),
(DEFAULT, "Banco Itaú", "RTE251G44", "equipe_itau@gmail.com", "Teste@123", "23.456.789-12"),
(DEFAULT, "Banco C6", "HJI987C11", "c6_ctt@hotmail.com", "Urubu100%", "11.222.333-44"),
(DEFAULT, "Banco Bradesco", "CAS112Q57", "bradescontato@yahoo.com", "VaiBrasil2025#", "10.192.287-10");

INSERT INTO usuarios VALUES
(DEFAULT, "Pedro Alcântara", "pedro@gmail.com", "senhA123$", "nivel1", "Gestor", 1),
(DEFAULT, "Gabriella Pedrosa", "gabriella@outlook.com", "Urubu100$", "nivel1", "Gestor", 2),
(DEFAULT, "Rafael Sampaio", "sampaio@hotmail.com", "#TesteSenh4", "nivel2", "Analista de Infraestrutura", 1),
(DEFAULT, "Maria Antônia", "maria@yahoo.com", "faz$enhaL0g0", "nivel2", "Analista de Dados", 2);

