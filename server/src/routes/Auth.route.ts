import Router from 'express';
import AuthController from '../controllers/Auth.controller';
import registerValidation from '../middlewares/register.middleware';

const router = Router();

router.post('/registrar', registerValidation, AuthController.register);
router.post('/entrar', AuthController.login);

export default router;
