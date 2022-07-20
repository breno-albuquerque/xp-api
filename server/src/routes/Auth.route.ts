import Router from 'express';
import AuthController from '../controllers/Auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/registrar', authMiddleware.validRegister, AuthController.register);
router.post('/entrar', AuthController.login);

export default router;
