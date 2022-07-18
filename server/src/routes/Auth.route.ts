import Router from 'express';
import AuthController from '../controllers/Auth.controller';

const router = Router();

router.post('/registrar', AuthController.create);
router.post('/logar', AuthController.login);

export default router;
