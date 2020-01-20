import { Router } from 'express';
import MailAddressController from '../controllers/MailAddressController';
import MailAddressRequestValidator from './validators/mailAddress';

const MailAddressRouter = new Router();

MailAddressRouter.route('/').post(
  MailAddressRequestValidator.store,
  MailAddressController.store
);

MailAddressRouter.route('/:id').put(
  MailAddressRequestValidator.update,
  MailAddressController.update
);

export default MailAddressRouter;
