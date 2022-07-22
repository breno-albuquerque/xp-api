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
 */    

router.use('/auth', ClienteRouter);
/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: Endpoints de autorização
 */
router.use('/conta', ContaRouter);
/**
 * @swagger
 *  tags:
 *      name: Conta
 *      description: Endpoints de operações da conta
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
