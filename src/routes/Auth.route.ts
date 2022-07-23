import Router from 'express';
import AuthController from '../controllers/Auth.controller';
import registerValidation from '../middlewares/register.middleware';
import loginValidation from '../middlewares/login.middleware';

const router = Router();

router.post(
  '/registrar',
  registerValidation,
  AuthController.register,
);

router.post(
  '/entrar',
  loginValidation,
  AuthController.login,
);

export default router;
