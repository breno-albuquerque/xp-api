import Router from 'express';
import ContaController from '../controllers/Conta.controller';
import { validateBodyId, validateParamId } from '../middlewares/cliente.middleware';
import transactionValidation from '../middlewares/conta.middleware';
import tokenValidation from '../middlewares/token.middleware';

const router = Router();

router.use(tokenValidation);

router.get(
  '/:CodCliente',
  validateParamId,
  ContaController.getById,
);
  
router.post(
  '/depositar',
  validateBodyId,
  transactionValidation,
  ContaController.deposit,
);

router.post(
  '/sacar',
  validateBodyId,
  transactionValidation,
  ContaController.withdrawal,
);

router.delete(
  '/delete/:CodCliente',
  validateParamId,
  ContaController.remove,
);

export default router;
