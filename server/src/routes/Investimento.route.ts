import Router from 'express';
import InvestimentoController from '../controllers/Investimento.controller';

const router = Router();

router.post('/comprar', InvestimentoController.buyAssets);
router.post('/vender', InvestimentoController.sellAssets);

export default router;
