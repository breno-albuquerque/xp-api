import Router from 'express';
import AtivoController from '../controllers/Ativo.controller';
import { validateParamId } from '../middlewares/cliente.middleware';
import tokenValidation from '../middlewares/token.middleware';

const router = Router();

router.get('/all', AtivoController.getAll);
router.get('/:CodAtivo', AtivoController.getById);

router.get(
  '/cliente/:CodCliente',
  tokenValidation,
  validateParamId,
  AtivoController.getByClient,
);

export default router;
