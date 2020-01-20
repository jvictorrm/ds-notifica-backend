import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import SessionRequestValidator from './validators/session';
import bruteforce from '../schemas/BruteForce';

const SessionRouter = new Router();

SessionRouter.route('/').post(
  bruteforce.prevent,
  SessionRequestValidator.store,
  SessionController.store
);

export default SessionRouter;
