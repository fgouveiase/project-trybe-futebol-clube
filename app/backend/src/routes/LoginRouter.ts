import { Router } from 'express';
import loginValidate from '../middleware/loginValidate';
import validToken from '../middleware/tokenValidate';
import LoginController from '../controllers/LoginController';

const LoginRouter = Router();

LoginRouter.post('/', loginValidate.isValid, LoginController.login);
LoginRouter.get('/role', validToken.validate, LoginController.getRole);

export default LoginRouter;
