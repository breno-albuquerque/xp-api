import Router from 'express';
import AuthController from '../controllers/Auth.controller';

const router = Router();

router.post('/register', AuthController.create);
router.post('/login', AuthController.login);

export default router;