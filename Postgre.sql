CREATE SEQUENCE Contas_seq;
CREATE TABLE "Contas" (
  "Id" INTEGER DEFAULT NEXTVAL ('Contas_seq') PRIMARY KEY NOT NULL,
  "Cpf" VARCHAR(11) NOT NULL,
  "Nome" TEXT NOT NULL,
  "Email" TEXT NOT NULL,
  "Senha" TEXT NOT NULL,
  "Saldo" DOUBLE PRECISION DEFAULT 0
);

CREATE SEQUENCE Ativos_seq;
CREATE TABLE "Ativos" (
  "Id" INTEGER DEFAULT NEXTVAL ('Ativos_seq') PRIMARY KEY NOT NULL,
  "QtdeAtivo" INT DEFAULT 100,
  "Simbolo" TEXT NOT NULL
);

CREATE SEQUENCE Depositos_seq;
CREATE TABLE "Depositos" (
  "Id"  INTEGER DEFAULT NEXTVAL ('Depositos_seq') PRIMARY KEY NOT NULL,
  "CodCliente" INTEGER NOT NULL,
  "Valor" DOUBLE PRECISION NOT NULL,
  FOREIGN KEY ("CodCliente") REFERENCES "Contas"("Id")
	  ON DELETE CASCADE
);

CREATE SEQUENCE Saques_seq;
CREATE TABLE "Saques" (
  "Id"  INTEGER DEFAULT NEXTVAL ('Saques_seq') PRIMARY KEY NOT NULL,
  "CodCliente" INTEGER NOT NULL,
  "Valor" DOUBLE PRECISION NOT NULL,
  FOREIGN KEY ("CodCliente") REFERENCES "Contas"("Id")
	  ON DELETE CASCADE
);

CREATE TABLE "Investimentos" (
  "CodCliente"  INTEGER NOT NULL,
  "CodAtivo" INTEGER NOT NULL,
  "QtdeAtivo" INTEGER NOT NULL,
  PRIMARY KEY ("CodCliente", "CodAtivo"),
  FOREIGN KEY ("CodCliente") REFERENCES "Contas"("Id"),
  FOREIGN KEY ("CodAtivo") REFERENCES "Ativos"("Id") 
);

INSERT INTO "Ativos" ("Simbolo") 
VALUES 
  ('RRRP3'),
  ('TTEN3'),
  ('EALT3'),
  ('EALT4');