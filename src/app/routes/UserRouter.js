import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserRequestValidator from './validators/user';
import authMiddleware from '../middlewares/auth';

const UserRouter = new Router();

UserRouter.route('/')
  .post(UserRequestValidator.store, UserController.store)
  .put(authMiddleware, UserRequestValidator.update, UserController.update)
  .delete(authMiddleware, UserController.delete);

export default UserRouter;
