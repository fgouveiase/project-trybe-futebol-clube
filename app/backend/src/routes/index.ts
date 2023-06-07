import { Router } from 'express';
import TeamRouter from './TeamRouter';
import errorHandler from '../middleware/errorHandler';
import LoginRouter from './LoginRouter';
import MatchRouter from './MatchRouter';
import LeaderBoardRouter from './LeaderBoardRouter';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchRouter);
router.use('/leaderboard', LeaderBoardRouter);

router.use(errorHandler);

export default router;
