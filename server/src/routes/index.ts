import { Router } from 'express';
import ContaRouter from './Conta.route';
import ClienteRouter from './Auth.route';
import AtivoRouter from './Ativo.route';
import InvestimentoRouter from './Investimento.route';

const router = Router();

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



router.use('/investimentos', InvestimentoRouter);
/**
 * @swagger
 *  tags:
 *      name: Investimentos
 *      description: Endpoints para realizar investimentos
 */

export default router;
