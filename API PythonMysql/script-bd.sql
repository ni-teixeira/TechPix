
-- Active: 1724686043904@@127.0.0.1@3306@ajuda
-- Script de BD do projeto do TechPix

-- novo script c:
-- DROP DATABASE TechPix;
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

create table if not exists Funcionario(
	idFuncionario int primary key auto_increment,
    nome varchar(45) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    cargo varchar(45) not null,
    fkEmpresa int,
	constraint fkEmpFunc foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table if not exists Servidores(
	idServidores int primary key auto_increment,
    nomeServidor varchar(45) not null,
    ip varchar(45) not null,
    localizacao varchar(45),
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
(DEFAULT, 'TechPix', 'ABCD12345', 'techpix@gmail.com', 'TechPix@100', '4254364334'),
(DEFAULT, 'Banco Safra', 'UFG14SR32', 'contato_safra@outlook.com', 'Teste123%', '1234567833'),
(DEFAULT, 'Banco Itaú', 'RTE251G44', 'equipe_itau@gmail.com', 'Teste@123', '2345678912'),
(DEFAULT, 'Banco C6', 'HIJ987C11', 'c6_ctt@hotmail.com', 'Urubu100%', '1122233344'),
(DEFAULT, 'Banco Bradesco', 'CAS112Q57', 'bradescontato@yahoo.com', 'VaiBrasil2025#', '1019228710');

INSERT INTO Funcionario (nome, email, senha, cargo, fkEmpresa) VALUES
('Ariel Rocha', 'ariel.rocha@gmail.com', 'SenhaAriel123#', 'CEO', 1),
('Caio Visconti', 'caio.visconti@outlook.com', 'SenhaCaio123@', 'CEO', 1),
('Gabriel Santos', 'gabriel.santos@hotmail.com', 'SenhaGabriel123@', 'CEO', 1),
('Guilherme Fonseca', 'guilherme.fonseca@yahoo.com', 'SenhaGuilherme123@', 'CEO', 1),
('Nicoly Teixeira', 'nicoly.teixeira@gmail.com', 'SenhaNicoly123@', 'CEO', 1),
('Pedro Alcântara', 'pedro@gmail.com', 'SenhaBoa123#', 'Gestor', 2),
('Rafael Sampaio', 'sampaio@hotmail.com', '#TesteSenh4', 'Analista de Infraestrutura', 2),
('Maria Antônia', 'maria@yahoo.com', 'f@zsenhaL0g0', 'Ciêntista de Dados', 2),
('Gabriella Pedrosa', 'gabriella@outlook.com', 'grubu100$', 'Gestor', 3);

INSERT INTO Servidores VALUES
(DEFAULT, 'Nicoly', '123.0.0.1', 'ALI EM CIMA', 'Ativo', 2), -- 1, 2, 3, 4, 5
(DEFAULT, 'Gabriel', '123.0.1.1', 'ALI DO LADO', 'Ativo', 2), -- 6, 7, 8, 9, 10
(DEFAULT, 'Guilherme', '123.0.1.2', 'ALI EMBAIXO', 'Ativo', 2), -- 11, 12, 13, 14, 15
(DEFAULT, 'Caio', '123.1.1.0', 'ALI ATRÁS', 'Ativo', 2), -- 16, 17, 18, 19, 20
(DEFAULT, 'Ariel', '123.0.1.0', 'ALI NA FRENTE', 'Ativo', 2); -- 21, 22, 23, 24, 25

INSERT INTO Componentes VALUES
(DEFAULT, 'CPU', 'Intel i9', 1, 1),
(DEFAULT, 'RAM', 'RAM 16GB', 1, 1),
(DEFAULT, 'Disco', 'SSD 512GB', 1, 1),
(DEFAULT, 'Placa de Rede', 'rede1', 1, 1),
(DEFAULT, 'Processos', 'teste', 1, 1);


SELECT 
    f.idFuncionario, 
    f.nome,
    e.idEmpresa, 
    e.razaoSocial, 
    f.cargo AS cargo
FROM Funcionario as f
JOIN Empresa as e 
ON f.fkEmpresa = e.idEmpresa
WHERE f.email = 'pedro@gmail.com'
AND e.codigoEmpresa = 'UFG14SR32'
AND f.senha = 'SenhaBoa123#';

SELECT * FROM Monitoramento;

