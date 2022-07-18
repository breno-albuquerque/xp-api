import Router from 'express';
import ContaController from '../controllers/Conta.controller';

const router = Router();

router.get('/:contaId', ContaController.getById);
router.post('/register', ContaController.create);
router.post('/login', ContaController.login);

export default router;
