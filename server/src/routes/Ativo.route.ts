import Router from 'express';
import AtivoController from '../controllers/Ativo.controller';

const router = Router();

router.get('/:codAtivo', AtivoController.getById);

export default router;
