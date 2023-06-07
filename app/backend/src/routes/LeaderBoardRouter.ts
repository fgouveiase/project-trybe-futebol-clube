import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderBoardController';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/home', LeaderboardController.filter);
LeaderboardRouter.get('/away', LeaderboardController.teamAway);

export default LeaderboardRouter;
