
-- Active: 1724686043904@@127.0.0.1@3306@ajuda
-- Script de BD do projeto do TechPix

-- novo script c:

create database TechPix;
use TechPix;

create database if not exists TechPix;
use TechPix;

create table if not exists Enderecos(
	idEndereco int primary key auto_increment,
    cep char(8) not null,
    numero varchar(10) not null,
    logradouro varchar(45) not null,
	complemento varchar(20),
    bairro varchar(45) not null,
    cidade varchar(45) not null,
    estado char(2) not null,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

create table if not exists Empresa(
	idEmpresa int primary key auto_increment,
    razaoSocial varchar(45) not null,
    codigoEmpresa varchar(20) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    cnpj char(14) not null
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
    tipo VARCHAR(90),
    medida float not null,
    dtHora DATETIME,
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

INSERT INTO Empresa VALUES
(DEFAULT, 'Banco Safra', 'SF8A90', 'safra@gmail.com', 'Urubu#100', '12345678901234');

INSERT INTO Servidores VALUES
(DEFAULT, 'ABC', '123.0.0.1', 'ALI EM CIMA', 'Ativo', 1);

INSERT INTO Servidores VALUES
(DEFAULT, 'BCD', '123.0.1.1', 'ALI DO LADO', 'Ativo', 1),
(DEFAULT, 'CDE', '123.0.1.1', 'ALI EMBAIXO', 'Ativo', 1),
(DEFAULT, 'DEF', '123.1.1.0', 'ALI ATRÁS', 'Ativo', 1),
(DEFAULT, 'EFG', '123.0.1.0', 'ALI NA FRENTE', 'Ativo', 1);

INSERT INTO Componentes VALUES
(DEFAULT, 'CPU', 'Intel i9', 1, 1),
(DEFAULT, 'RAM', 'RAM 16GB', 1, 1),
(DEFAULT, 'Disco', 'SSD 512GB', 1, 1),
(DEFAULT, 'Placa de Rede', 'rede1', 1, 1);

SELECT * FROM Monitoramento;

SELECT * FROM Componentes;

TRUNCATE Monitoramento;

USE Techpix;

SELECT * FROM Monitoramento AS m JOIN Componentes AS c ON c.idComponentes = m.fkComponente JOIN Servidores AS s ON s.idServidores = c.fkServidor WHERE idServidores = 1;

SELECT idServidores,  FROM Servidores AS s JOIN Empresa AS e ON e.idEmpresa = s.fkEmpresa WHERE e.email = 'safra@gmail.com' and e.senha = 'Urubu#100';

SELECT DISTINCT  m.tipo FROM Monitoramento AS m JOIN Componentes AS c ON m.fkComponente = c.idComponentes WHERE c.fkServidor = 1;

SELECT tipo, idComponentes FROM Componentes WHERE fkServidor = 1;

SELECT AVG(medida) FROM Monitoramento WHERE fkComponente = 5 AND tipo LIKE 'Porcentagem%' LIMIT 10;

SELECT * FROM Monitoramento;