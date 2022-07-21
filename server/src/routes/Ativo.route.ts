import Router from 'express';
import AtivoController from '../controllers/Ativo.controller';

const router = Router();

router.get('/:CodAtivo', AtivoController.getById);
router.get('/cliente/:CodCliente', AtivoController.getByClient);

export default router;
