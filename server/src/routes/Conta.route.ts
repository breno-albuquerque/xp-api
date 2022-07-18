import Router from 'express';
import ContaController from '../controllers/Conta.controller';

const router = Router();

router.get('/:contaId', ContaController.getById);

router.post('/deposit', ContaController.deposit);

export default router;
