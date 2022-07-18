import { Router } from 'express';
import ContaRouter from './Conta.route';
import AuthRouter from './Auth.route';

const router = Router();

router.use('/conta', ContaRouter);
router.use('/auth', AuthRouter);

export default router;