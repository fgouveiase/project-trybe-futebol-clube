import { Router } from 'express';
import validToken from '../middleware/tokenValidate';
import MatchController from '../controllers/MatchController';
import MatchUtils from '../utils/match.utils';

const MatchRouter = Router();

MatchRouter.get('/', MatchController.getAll);
MatchRouter.patch('/:id/finish', validToken.validate, MatchController.getMatchFinished);
MatchRouter.patch('/:id', validToken.validate, MatchController.matchBody);
MatchRouter.post('/', validToken.validate, MatchUtils.validate, MatchController.matchCreate);

export default MatchRouter;
