import Router from 'express';
import ContaController from '../controllers/Conta.controller';
import contaMiddleware from '../middlewares/conta.middleware';

const router = Router();

router.get('/:codCliente', ContaController.getById);

router.post('/depositar', contaMiddleware.validTransaction, ContaController.deposit);
router.post('/sacar', contaMiddleware.validTransaction, ContaController.withdrawal);

export default router;
