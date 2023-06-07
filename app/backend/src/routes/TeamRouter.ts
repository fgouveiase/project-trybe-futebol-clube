import { Router } from 'express';

import * as TeamController from '../controllers/TeamController';

const TeamRouter = Router();

TeamRouter.get('/', TeamController.getAll);
TeamRouter.get('/:id', TeamController.getById);

export default TeamRouter;
