import { Router } from 'express';
import ContaRouter from './Conta.route';
import AuthRouter from './Auth.route';
import AtivoRouter from './Ativo.route';
import InvestimentoRouter from './Investimento.route';

const router = Router();

router.use('/conta', ContaRouter);
router.use('/auth', AuthRouter);
router.use('/ativos', AtivoRouter);
router.use('/investimentos', InvestimentoRouter)

export default router;