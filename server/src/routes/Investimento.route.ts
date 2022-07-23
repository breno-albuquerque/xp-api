import Router from 'express';
import InvestimentoController from '../controllers/Investimento.controller';
import { validateBodyId } from '../middlewares/cliente.middleware';
import tokenValidation from '../middlewares/token.middleware';
import investValidation from '../middlewares/investimento.middleware';

const router = Router();

router.use(
  tokenValidation,
  validateBodyId,
  investValidation,
);

router.post(
  '/comprar',
  InvestimentoController.purchase,
);

router.post(
  '/vender', 
  InvestimentoController.sale,
);

export default router;
