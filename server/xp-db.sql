DROP SCHEMA IF EXISTS `xp-db`;
CREATE SCHEMA IF NOT EXISTS `xp-db`;

CREATE TABLE `xp-db`.Contas (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  saldo FLOAT DEFAULT 0
);

CREATE TABLE `xp-db`.Ativos (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  quantidade INT DEFAULT 100,
  simbolo VARCHAR(8) NOT NULL
);

CREATE TABLE `xp-db`.Depositos (
	id  INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    conta_id INTEGER NOT NULL,
    valor FLOAT NOT NULL,
    FOREIGN KEY (conta_id) REFERENCES Contas(id)
);

CREATE TABLE `xp-db`.Saques (
	id  INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    conta_id INTEGER NOT NULL,
    valor FLOAT NOT NULL,
    FOREIGN KEY (conta_id) REFERENCES Contas(id)
);

CREATE TABLE `xp-db`.Investimentos (
	conta_id  INTEGER NOT NULL,
    ativo_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    FOREIGN KEY (conta_id) REFERENCES Contas(id),
    FOREIGN KEY (ativo_id) REFERENCES Ativos(id)
);

CREATE TABLE `xp-db`.Operações (
	conta_id  INTEGER NOT NULL,
    ativo_id INTEGER NOT NULL,
    tipo VARCHAR(5) NOT NULL,
    valor_total FLOAT NOT NULL,
    FOREIGN KEY (conta_id) REFERENCES Contas(id),
    FOREIGN KEY (ativo_id) REFERENCES Ativos(id)
);