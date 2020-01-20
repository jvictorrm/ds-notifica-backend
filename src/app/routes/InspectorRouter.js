import { Router } from 'express';
import InspectorController from '../controllers/InspectorController';
import InspectorRequestValidator from './validators/inspector';

const InspectorRouter = new Router();

InspectorRouter.route('/').get(
  InspectorRequestValidator.index,
  InspectorController.index
);

export default InspectorRouter;
