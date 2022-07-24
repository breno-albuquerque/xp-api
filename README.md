# XP-Api

XP-Api é uma API que simula uma corretora de ações. Permite que clientes se cadastrem, façam operações de depósito e saque com sua conta e realizem investimentos através da compra e venda de ações.

  * <strong>Deploy</strong> (Documentação com Swagger): https://projeto-xp.herokuapp.com/docs


## Como rodar localmente:

#### Requisitos:

- Node.js (16 ou mais)

#### Clonar repositório:

```bash
git clone https://github.com/breno-albuquerque/xp-api
```

#### Configurar Banco de Dados:

- Mude o nome do arquivo .env.example para .env
- Na variável PORT, inisira o número da porta que deseja rodar a aplicação
- Nas variáveis que iniciam com PG, coloque as credenciais do banco de dados PostgreSQL
- Utilize o arquivo Postgre.sql para criar as tabelas no formato esperado ou crie manualmente em algum serviço como [Supabase](https://supabase.com/), seguindo o formato proposto no arquivo.

#### Instalação e inicialização:
```bash
cd xp-api
npm install
npm start
```

## Decisões de desenvolvimento:

#### Modelagem do banco de dados

 * Optei por desenvolver utilizando um banco de dados SQL, com as seguintes tabelas:
   - <strong>Contas:</strong> Dados da conta do cliente, incluindo o saldo.
   - <strong>Ativos:</strong> Dados dos ativos disponíveis na corretora.
   - <strong>Investimentos:</strong> Tabela que relaciona <strong>Contas</strong> com <strong>Ativos</strong>. Armazena os ativos investidos por cada cliente e qual quantidade cada cliente possui de cada ativo.
   - <strong>Depositos:</strong> Tabela que se relaciona com  <strong>Contas</strong>. Armazena todos depósitos realizados por cada conta.
   - <strong>Saques:</strong> Tabela que se relaciona com  <strong>Contas</strong>. Armazena todos saques realizados por cada conta.

#### Escolha do SGBD

-  Durante o desenvolvimento, eu utilizei o sistema de gerenciamento de banco de dados MySQL, pelo fato de eu possuir uma workbench instalada localmente.
- Porém, ao partir para a realização do deploy, vi a necessidade de migrar para o PostgreSQL, por possuir serviços gratuitos com qualidade maior, como o supabase.
- Por isso, o código conta com duas conexões diferentes com bancos de dados, para alternar entre elas, basta mudar o atributo conn das classes da camada de service e fazer pequenas alterações de tipagens e retorno da camada model.
- As queries já estão devidamente separadas e armazenadas nos atributos das classes que representam cada conexão com o banco de dados.

#### Escolha de tecnologias

- Escolhi desenvolver a API utilizando node.js/express com typescript, para aplicar a tipagem estática, garantindo um código mais seguro e facilitando a correção de bugs durante desenvolvimento.
- Utilizei o Docker para criar dois containers durante o desenvolvimento, um para rodar a aplicação node e outro para o banco de dados MySQL

#### Arquitetura e Paradigmas

- Utilizei o formato de arquitetura models, services, controllers.
- Utilizei parte do código com o paradigma orientado a objetos e parte com o paradigma funcional, alternando entre eles de acordo com o que achei mais adequado para o contexto
  - As conexões com o banco de dados utiliza classes.
  - As camadas de models e de services utilizam classes.
  - As camadas de controllers e middlewares utilizam funções.

#### Testes da aplicação

- Realizei uma grande cobertura de testes para garantir a segurança do código, utilizando chai, sinon e mocha.
- Todos métodos da camada model e funções da camada controller possuem testes unitários. A camada de service possui quase todos métodos testados, com excessão de poucos.
- Tentei cobrir os diversos casos de cada função/método, verificando o retorno e as excessões que deveriam ser lançadas.
- Também fiz uma cobertura com testes de integração, utilizando o chai-http para fazer as requisições.

#### Documentação e CI / CD

- Utilizei a ferramenta [Swagger](https://swagger.io/) para a documentação, que está disponível na rota /docs
- Para garantir as práticas de CI / CD, utilizei as actions do github, que estão configuradas para rodar o ESlint e os testes, tando unitários, quanto de integração. O repositório está conectado com um app do [Heroku](https://www.heroku.com/home), possibilitando uma integração contínua e deploy contínuo.

#### Preços das ações

- Optei por trabalhar com os preços reais das ações.
- As requisições que envolvem o valor da ação, passam por uma consulta na API [OkaneBox](https://www.okanebox.com.br/) para coletar o preço atualizado do ativo.

#### Estrutura de pastas e arquivos pricipais
```bash
XP-Api/ # Este arquivo
├── .github
│      └── workflows # Configuração das actions
├── src # Pasta principal
│     ├── controllers # Camada de controllers
│     │── database
│     │   │── connections # Conexões com bancos de dados
│     │   └── queries # Queries para MySQL e PostgreSQL
│     │── docs # Configuração do swagger
│     ├── interfaces # Interfaces para tipagem de dados
│     │── middlewares # Camada de middlewares
│     │── models # Camada de models
│     │── routes # Rotas da API
│     │── tests # Arquivos de teste
│     │    │── controllers # Testes dos controllers
│     │    │── integration # Testes de integração
│     │    │── mocks # Dados para realização de testes
│     │    │── models # Testes dos models
│     │    └── services # Testes dos services
│     │── utils # Funções e classes de suporte
│     │── app.ts # Arquivo de inicialização do express
│     └── server.ts # Arquivo de inicialização do servidor          
│── package.json # Configuração do ambiente node
└── package-lock.json # Versionamento das dependências
```

## Funcionalidades da API:

#### Registrar conta:
  * Endpoint: POST (/auth/registrar)
  * Recebe como entrada um json no seguinte formato:
  * É retornado o identificador único do cliente

  ```json
  {
    "Nome": "Nome Exemplo",
    "Cpf": "12345678900",
    "Email": "exemplo@email",
    "Senha": "exemplo"
  }
  ```
###### Verificações de campo:
- "Nome": string, min 3 caracteres.
- "Cpf": string, 11 caracteres.
- "Email": string, formato de email válido.
- "Senha": string, min 6 caracteres.  

#### Entrar na conta:
  * Endpoint: POST (/auth/entrar)
  * Recebe como entrada um json no seguinte formato:
  * É retornado um <strong>Jason Web Token (JWT)</strong>

   ```json
  {
    "Email": "exemplo@email",
    "Senha": "exemplo"
  }
  ```
###### Verificações de campo:
- "Email": string, formato de email válido.
- "Senha": string, min 6 caracteres.


#### Ver detalhes da conta:
  * Endpoint: GET (/conta/{CodCliente})
  * Requer Autorização no header
    - authorization: Baerer JWT
  * Parâmetro - CodCliente:
    - Identificador único da conta.
    - Tipo Inteiro.
  * Formato da resposta:

  ```json
    {
      "Id": 1,
      "Nome": "Nome Exemplo",
      "Saldo": 0,
    }
  ```

#### Depositar:
  * Endpoint: POST (/conta/depositar)
  * Requer Autorização no header
    - authorization: Baerer JWT
  * Recebe como entrada um json no seguinte formato:

  ```json
    {
      "CodCliente": 1,
      "Valor": 1000.00
    }
  ```
###### Verificações de campo:
- "CodCliente": integer.
- "Valor": decimal

#### Sacar:
  * Endpoint: POST (/conta/sacar)
  * Requer Autorização no header
    - authorization: Baerer JWT
  * Recebe como entrada um json no seguinte formato:

  ```json
    {
      "CodCliente": 1,
      "Valor": 1000.00
    }
  ```
###### Verificações de campo:
- "CodCliente": integer.
- "Valor": decimal


#### Deletar conta:
  * Endpoint: POST (/conta/delete/{CodCliente})
  * Requer Autorização no header
    - authorization: Baerer JWT
    * Parâmetro - CodCliente:
    - Identificador único da conta.
    - Tipo Inteiro.

#### Buscar todos ativos disponíveis na corretora:
  * Endpoint: GET (/ativos/all)
  * Formato da resposta:

  ```json
  [
    {
      "Id": 1,
      "QtdeAtivo": 100,
      "Simbolo": "AZUL4",
    },
    {
      "Id": 1,
      "QtdeAtivo": 100,
      "Simbolo": "PETR4",
    },
  ]
  ```
#### Buscar um ativo disponível na corretora:
  * Endpoint: GET (/ativos/{CodAtivo})
  * Parâmetro - CodAtivo:
    - Identificador único do ativo.
    - Tipo Inteiro.
  * Formato da resposta:

  ```json
  {
    "CodAtivo": 1,
    "Simbolo": "AZUL4",
    "QtdeAtivo": 100,
    "Valor": 30.00
  }
  ```
#### Buscar por ativos da carteira do cliente:
  * Endpoint: GET (/ativos/cliente/{CodCliente})
  * Requer Autorização no header
    - authorization: Baerer JWT
  * Parâmetro - CodCliente:
    - Identificador único do cliente.
    - Tipo Inteiro.
  * Formato da resposta:

  ```json
  [
    {
      "CodAtivo": 1,
      "CodCliente": 1,
      "QtdeAtivo": 10,
      "Simbolo": "AZUL4",
      "Valor": 30.00
    },
    {
      "CodAtivo": 2,
      "CodCliente": 1,
      "QtdeAtivo": 10,
      "Simbolo": "PETR4",
      "Valor": 20.00
    },
  ]
  ```
#### Comprar ativo:
  * Endpoint: POST (/investimentos/comprar)
  * Requer Autorização no header
    - authorization: Baerer JWT
  * Recebe como entrada um json no seguinte formato:

  ```json
    {
      "CodCliente": 1,
      "CodAtivo": 1,
      "QtdeAtivo": 10
    }
  ```
###### Verificações de campo:
- "CodCliente": integer.
- "CodAtivo": integer.
- "QtdeAtivo": integer.

#### Vender ativo:
  * Endpoint: POST (/investimentos/vender)
  * Requer Autorização no header
    - authorization: Baerer JWT
  * Recebe como entrada um json no seguinte formato:

  ```json
    {
      "CodCliente": 1,
      "CodAtivo": 1,
      "QtdeAtivo": 10
    }
  ```
###### Verificações de campo:
- "CodCliente": integer.
- "CodAtivo": integer.
- "QtdeAtivo": integer.
