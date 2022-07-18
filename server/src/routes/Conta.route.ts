import Router from 'express';
import ContaController from '../controllers/Conta.controller';

const router = Router();

router.get('/:contaId', ContaController.getById);
router.post('/register', ContaController.create);

export default router;
