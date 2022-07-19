DROP SCHEMA IF EXISTS `xp-db`;
CREATE SCHEMA IF NOT EXISTS `xp-db`;

CREATE TABLE `xp-db`.Contas (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  senha TEXT NOT NULL,
  saldo DOUBLE DEFAULT 0
);

CREATE TABLE `xp-db`.Ativos (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  quantidade INT DEFAULT 100,
  simbolo TEXT NOT NULL
);

CREATE TABLE `xp-db`.Depositos (
	id  INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    contaId INTEGER NOT NULL,
    valor DOUBLE NOT NULL,
    FOREIGN KEY (contaId) REFERENCES Contas(id)
);

CREATE TABLE `xp-db`.Saques (
	id  INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    contaId INTEGER NOT NULL,
    valor DOUBLE NOT NULL,
    FOREIGN KEY (contaId) REFERENCES Contas(id)
);

CREATE TABLE `xp-db`.Investimentos (
	contaId  INTEGER NOT NULL,
    ativoId INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    FOREIGN KEY (contaId) REFERENCES Contas(id),
    FOREIGN KEY (ativoId) REFERENCES Ativos(id)
);

CREATE TABLE `xp-db`.Operações (
	contaId  INTEGER NOT NULL,
    ativoId INTEGER NOT NULL,
    tipo VARCHAR(5) NOT NULL,
    valor_total DOUBLE NOT NULL,
    FOREIGN KEY (contaId) REFERENCES Contas(id),
    FOREIGN KEY (ativoId) REFERENCES Ativos(id)
);

INSERT INTO `xp-db`.Ativos (simbolo) 
VALUES 
  ('RRRP3'),
  ('TTEN3'),
  ('EALT3'),
  ('EALT4');
