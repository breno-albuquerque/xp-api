import Router from 'express';
import InvestimentoController from '../controllers/Investimento.controller';
import { validateBodyId } from '../middlewares/cliente.middleware';
import tokenValidation from '../middlewares/token.middleware';

const router = Router();

router.post(
  '/comprar',
  tokenValidation,
  validateBodyId,
  InvestimentoController.purchase,
);

router.post(
  '/vender', 
  tokenValidation,
  validateBodyId,
  InvestimentoController.sale,
);

export default router;
