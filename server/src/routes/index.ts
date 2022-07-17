import { Router } from 'express';
import ContaRouter from './Conta.route';

const router = Router();

router.use('/conta', ContaRouter);

export default router;