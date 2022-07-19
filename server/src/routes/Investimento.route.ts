import Router from 'express';
import InvestimentoController from '../controllers/Investimento.controller';

const router = Router();

router.post('/comprar', InvestimentoController.buyAssets);

export default router;
