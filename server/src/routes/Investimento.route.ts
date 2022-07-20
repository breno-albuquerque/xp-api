import Router from 'express';
import InvestimentoController from '../controllers/Investimento.controller';

const router = Router();

router.post('/comprar', InvestimentoController.purchase);
router.post('/vender', InvestimentoController.sale);

export default router;
