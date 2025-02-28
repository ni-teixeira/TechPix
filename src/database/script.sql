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

-- novo script c:

create database if not exists TechPix;
use TechPix;

create table if not exists Empresa(
	idEmpresa int primary key auto_increment,
    razaoSocial varchar(45) not null,
    codigoEmpresa varchar(20) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    cnpj char(14) not null
);

create table if not exists Endereco(
	idEndereco int primary key auto_increment,
    cep char(8) not null,
    numero varchar(10) not null,
    logradouro varchar(45) not null,
	complemento varchar(20),
    bairro varchar(45) not null,
    cidade varchar(45) not null,
    estado char(2) not null
    fkEmpresa int unique,
    constraint fkEmpEnd foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table if not exists Funcionario(
	idFuncionario int primary key auto_increment,
    nome varchar(45) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    cargo varchar(45) not null,
    equipe varchar(45) not null,
    fkEmpresa int,
	constraint fkEmpFunc foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table if not exists Servidores(
	idServidores int primary key auto_increment,
    nomeServidor varchar(45) not null,
    ip varchar(45) not null,
    localizacao varchar(30) not null,
    status varchar(10) not null,
	fkEmpresa int,
	constraint fkEmpServ foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table if not exists Componentes(
	idComponentes int primary key auto_increment,
    tipo varchar(45) not null,
    descricao varchar(90) not null,
    limite int not null,
    fkServidor int,
	constraint fkCompServ foreign key (fkServidor) references Servidores(idServidores)
);

create table if not exists Monitoramento (
    idMonitoramento int primary key auto_increment,
    medida decimal not null,
    fkComponente int,
    constraint fkCompMon foreign key (fkComponente) references Componentes(idComponentes)
);

create table if not exists Alertas(
	idAlerta int primary key auto_increment,
	tipoComponente varchar(45),
	descricao varchar(150),
	nivelCritico varchar(10),
	dataHora datetime,
	fkComponente int,
    constraint fkCompAlerta foreign key (fkComponente) references Componentes(idComponentes)
);

SELECT * FROM Empresa;