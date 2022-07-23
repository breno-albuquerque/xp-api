DROP SCHEMA IF EXISTS `xp-db`;
CREATE SCHEMA IF NOT EXISTS `xp-db`;

CREATE TABLE `xp-db`.Contas (
  Id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  Cpf VARCHAR(11) NOT NULL,
  Nome TEXT NOT NULL,
  Email TEXT NOT NULL,
  Senha TEXT NOT NULL,
  Saldo DOUBLE DEFAULT 0
);

CREATE TABLE `xp-db`.Ativos (
  Id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  QtdeAtivo INT DEFAULT 100,
  Simbolo TEXT NOT NULL
);

CREATE TABLE `xp-db`.Depositos (
  Id  INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  Valor DOUBLE NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES Contas(Id)
	  ON DELETE CASCADE
);

CREATE TABLE `xp-db`.Saques (
  Id  INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  Valor DOUBLE NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES Contas(Id)
	  ON DELETE CASCADE
);

CREATE TABLE `xp-db`.Investimentos (
  CodCliente  INTEGER NOT NULL,
  CodAtivo INTEGER NOT NULL,
  QtdeAtivo INTEGER NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES Contas(Id),
  FOREIGN KEY (CodAtivo) REFERENCES Ativos(Id)
  
);

CREATE TABLE `xp-db`.Operações (
	CodCliente  INTEGER NOT NULL,
  CodAtivo INTEGER NOT NULL,
  Tipo VARCHAR(5) NOT NULL,
  ValorTotal DOUBLE NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES Contas(Id)
	  ON DELETE CASCADE,
  FOREIGN KEY (CodAtivo) REFERENCES Ativos(Id)
);

INSERT INTO `xp-db`.Ativos (Simbolo) 
VALUES 
  ('RRRP3'),
  ('TTEN3'),
  ('EALT3'),
  ('EALT4');
