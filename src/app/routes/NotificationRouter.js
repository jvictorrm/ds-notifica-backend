import { Router } from 'express';
import NotificationController from '../controllers/NotificationController';
import NotificationRequestValidator from './validators/notification';

const NotificationRouter = new Router();

NotificationRouter.route('/')
  .get(NotificationRequestValidator.index, NotificationController.index)
  .post(NotificationRequestValidator.store, NotificationController.store);

/* NotificationRouter.use('/:id', (req, resp, next) => {
  next();
}); */

NotificationRouter.route('/:id')
  .get(NotificationRequestValidator.index, NotificationController.index)
  .put(NotificationRequestValidator.update, NotificationController.update)
  .delete(NotificationController.delete);

export default NotificationRouter;
