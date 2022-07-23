/* eslint-disable max-len */
import { Router } from 'express';
import ContaRouter from './Conta.route';
import ClienteRouter from './Auth.route';
import AtivoRouter from './Ativo.route';
import InvestimentoRouter from './Investimento.route';

const router = Router();

/**
 * @swagger
 *  components:
 *       schemas:
 *          Conta_DB:
 *            type: object
 *            properties:
 *              Id: 
 *                type: integer
 *              Cpf: 
 *                type: string
 *              Nome:
 *                type: string
 *              Email:
 *                type: string
 *              Senha:
 *                type: string
 *              Saldo:
 *                type: number
 *            example:
 *              Id: 1
 *              Cpf: "12345678900"
 *              Nome: Name Example
 *              Email: example@email.com
 *              Senha: "123456"
 * 
 *          Ativo_DB:
 *            type: object
 *            properties:
 *              Id: 
 *                type: number
 *              Simbolo:
 *                type: string
 *              QtdeAtivo:
 *                type: number
 *            example:
 *              Id: 1
 *              QtdeAtivo: 100
 *              Simbolo: SYMBOL
 * 
 *          Investimento_DB:
 *            type: object
 *            properties:
 *              CodCliente:
 *                type: integer
 *              CodAtivo:
 *                type: integer
 *              QtdeAtivo:
 *                type: integer
 *            example:
 *              CodCliente: 1
 *              CodAtivo: 1
 *              QtdeAtivo: 10
 *          
 *          Deposito_DB:
 *            type: object
 *            properties:
 *              Id:
 *                type: integer
 *              Valor:
 *                type: number
 *            example:
 *              Id: 1
 *              Valor: 100.00
 * 
 *          Saque_DB:
 *            type: object
 *            properties:
 *              Id:
 *                type: integer
 *              Valor:
 *                type: number
 *            example:
 *              Id: 1
 *              Valor: 100.00
 */    

router.use('/auth', ClienteRouter);
/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: Endpoints de autorização
 */

/**
 * @swagger
 *  /auth/registrar:
 *    post:
 *      tags: [Auth]
 *      description: Registra uma nova conta no sistema. Será retornado um Jason Web Token (JWT)
 *      responses:
 *        201:
 *          description: Conta cadastrada. Requisição bem sucedida
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Nome:
 *                  type: string
 *                Cpf: 
 *                  type: string
 *                Email:
 *                  type: string
 *                Senha:
 *                  type: string
 *                Saldo:
 *                  type: number
 *              example:
 *                Nome: Name Example
 *                Cpf: '12345678900'
 *                Email: example@email.com
 *                Senha: "123456" 
*/

/**
 * @swagger
 *  /auth/entrar:
 *    post:
 *      tags: [Auth]
 *      description: Entra em uma conta já cadastrada. Será retornado um Jason Web Token (JWT)
 *      responses:
 *        201:
 *          description: Autorização concedida. Requisição bem sucedida.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Email:
 *                  type: string
 *                Senha:
 *                  type: string
 *              example:
 *                Email: example@email.com
 *                Senha: "123456" 
 */

router.use('/conta', ContaRouter);
/**
 * @swagger
 *  tags:
 *      name: Conta
 *      description: Endpoints para operações da conta do cliente
 */

/**
 * @swagger
 *  /conta/{CodCliente}:
 *    get:
 *      tags: [Conta]
 *      description: Solicita os dados da conta logada passando o identificador por parâmetro. Será retornado os dados da conta.
 *      parameters:
 *        - in: path
 *          name: CodCliente
 *          type: string
 *          required: true
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  Id:
 *                    type: integer
 *                    description: Identificador da conta (cliente)
 *                    example: 1
 *                  Name:
 *                    type: string
 *                    description: Nome do cliente
 *                    example: Nome Example
 *                  Saldo:
 *                    type: number
 *                    description: Saldo atual da conta
 *                    example: 1000.00            
 */

/**
 * @swagger
 *  /conta/depositar:
 *    post:
 *      tags: [Conta]
 *      description: Cria um registro do depósido no banco de dados e atualiza o saldo da conta
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                CodCliente:
 *                  type: integer
 *                  description: Identificador da conta (cliente)
 *                  example: 1
 *                Valor:
 *                  type: integer
 *                  description: Valor a ser depositado
 *                  example: 1000.00
 *      responses:
 *        201:
 *          description: Valor depositado com sucesso
 *      security:
 *        - bearerAuth: []
 */

/**
 * @swagger
 *  /conta/sacar:
 *    post:
 *      tags: [Conta]
 *      description: Cria um registro do saque no banco de dados e atualiza o saldo da conta
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                CodCliente:
 *                  type: integer
 *                  description: Identificador da conta (cliente)
 *                  example: 1
 *                Valor:
 *                  type: integer
 *                  description: Valor a ser sacado
 *                  example: 1000.00
 *      responses:
 *        201:
 *          description: Valor sacado com sucesso
 *      security:
 *        - bearerAuth: []
 */    

router.use('/ativos', AtivoRouter);
/**
 * @swagger
 *  tags:
 *      name: Ativos
 *      description: Endpoints para buscar Ativos
 */

/**
 * @swagger
 *  /ativos/all:
 *    get:
 *      tags: [Ativos]
 *      description: Retorna um array com todos os Ativos
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Ativo_DB'
 */

/**
 * @swagger
 *  /ativos/{CodAtivo}:
 *    get:
 *      tags: [Ativos]
 *      description: Retorna um objeto representando um AtivoCompleto
 *      parameters:
 *        - in: path
 *          name: CodAtivo
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                items:
 *                properties:
 *                  CodAtivo:
 *                    type: integer
 *                  Simbolo:
 *                    type: string
 *                  QtdeAtivo:
 *                    type: integer
 *                  Valor:
 *                    type: number
 */

/**
 * @swagger
 *  /ativos/cliente/{CodCliente}:
 *    get:
 *      tags: [Ativos]
 *      description: Retorna um array com os ativos presentes na carteira do cliente
 *      parameters:
 *        - in: path
 *          name: CodCliente
 *          type: string
 *          required: true
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    CodAtivo:
 *                      type: integer
 *                      example: 1
 *                    CodCliente:
 *                      type: integer
 *                      example: 1
 *                    QtdeAtivo:
 *                      type: integer
 *                      example: 10
 *                    Simbolo:
 *                      type: string
 *                      example: SYMBOL
 *                    Valor:
 *                      type: number 
 *                      example: 30.00
 */

router.use('/investimentos', InvestimentoRouter);
/**
 * @swagger
 *  tags:
 *      name: Investimentos
 *      description: Endpoints para realizar investimentos
 */

/**
 * @swagger
 *  /investimentos/comprar:
 *    post:
 *      tags: [Investimentos]
 *      description: Registra o investimento. Atualiza o saldo da conta. Atualiza quantidade de ativos da corretora.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Investimento_DB'
 *      responses:
 *        201:
 *          description: Investimento realizado com sucesso,
 *      security:
 *        - bearerAuth: []
 */

/**
 * @swagger
 *  /investimentos/vender:
 *    post:
 *      tags: [Investimentos]
 *      description: Registra a investimento. Atualiza o saldo da conta. Atualiza quantidade de ativos da corretora.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Investimento_DB'
 *      responses:
 *        201:
 *          description: Venda realizada com sucesso,
 *      security:
 *        - bearerAuth: []
 */

export default router;
