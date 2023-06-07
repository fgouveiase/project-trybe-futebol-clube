import { Request, Response } from 'express';
import Leaderboard from '../services/LeaderBoardService';

export default class LeaderboardController {
  public static async teamHome(req: Request, res: Response) {
    try {
      const result = await Leaderboard.teamHome();
      res.status(200).json(result[0]);
    } catch (error) {
      if (error instanceof Error) { console.log(error.message); }
      res.status(500).json({ message: error });
    }
  }

  public static async filter(req: Request, res: Response) {
    try {
      const result = await Leaderboard.filter();
      res.status(200).json(result[0]);
    } catch (error) {
      if (error instanceof Error) { console.log(error.message); }
      res.status(500).json({ message: error });
    }
  }

  public static async teamAway(req: Request, res: Response) {
    try {
      const result = await Leaderboard.teamAway();
      res.status(200).json(result[0]);
    } catch (error) {
      if (error instanceof Error) { console.log(error.message); }
      res.status(500).json({ message: error });
    }
  }
}
