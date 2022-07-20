import Router from 'express';
import ContaController from '../controllers/Conta.controller';
import transactionValidation from '../middlewares/conta.middleware';

const router = Router();

router.get('/:codCliente', ContaController.getById);

router.post('/depositar', transactionValidation, ContaController.deposit);
router.post('/sacar', transactionValidation, ContaController.withdrawal);

export default router;
