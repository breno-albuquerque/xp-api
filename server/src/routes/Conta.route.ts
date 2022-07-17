import Router from 'express';
import ContaController from '../controllers/Conta.controller';

const router = Router();

router.post('/register', ContaController.create);

export default router;
