import Router from 'express';
import ContaController from '../controllers/Conta.controller';

const router = Router();

router.get('/:codCliente', ContaController.getById);

router.post('/depositar', ContaController.deposit);
router.post('/sacar', ContaController.deposit);

export default router;
