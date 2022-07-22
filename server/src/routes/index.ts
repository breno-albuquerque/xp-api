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
 *          Ativo:
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
 *              Simbolo: SYMBOL
 *              QtdeAtivo: 100
 * 
 *          AtivoCompleto:
 *            type: object
 *            properties:
 *              CodAtivo: 
 *                type: number
 *              Simbolo:
 *                type: string
 *              QtdeAtivo:
 *                type: number
 *              Valor:
 *                type: number
 *            example:
 *              CodAtivo: 1
 *              Simbolo: SYMBOL
 *              QtdeAtivo: 100
 *              Valor: 30
 *          
 *          AtivoCliente:
 *            type: object
 *            properties:
 *              CodAtivo: 
 *                type: number
 *              CodCliente: 
 *                type: number
 *              Simbolo:
 *                type: string
 *              QtdeAtivo:
 *                type: number
 *              Valor:
 *                type: number
 *            example:
 *              CodCliente: 1
 *              CodAtivo: 1
 *              Simbolo: SYMBOL
 *              QtdeAtivo: 100
 *              Valor: 30
 * 
 *          Conta:
 *            type: object
 *            properties:
 *              Id: 
 *                type: number
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
 *              Cpf: 12345678900
 *              Nome: Name Example
 *              Email: example@email.com
 *              Senha: 123456       
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
 *      description: Registra uma nova e retorna um JWT
 *      responses:
 *        201:
 *          description: Conta cadastrada no sistema!
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
 *      description: Entra em uma conta ja cadastrada e retorna um JWT
 *      responses:
 *        201:
 *          description: Conta logada no sistema!
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
 *      description: Retorna um objeto com alguns dados da Conta
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
 *                  $ref: '#/components/schemas/Ativo'
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
 *                $ref: '#/components/schemas/AtivoCompleto'
 */

/**
 * @swagger
 *  /ativos/cliente/{CodCliente}:
 *    get:
 *      tags: [Ativos]
 *      description: Retorna um array com os ativos da carteira do cliente, no formato AtivoCliente
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
 *                  $ref: '#/components/schemas/AtivoCliente'
 */

router.use('/investimentos', InvestimentoRouter);
/**
 * @swagger
 *  tags:
 *      name: Investimentos
 *      description: Endpoints para realizar investimentos
 */

export default router;
