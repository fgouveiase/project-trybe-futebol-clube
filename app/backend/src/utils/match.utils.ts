import { Request, Response, NextFunction } from 'express';
import Team from '../database/models/Team';

export default class validateTeams {
  public static async validate(req: Request, res: Response, next: NextFunction):
  Promise<void | Response> {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const teamHome = await Team.findOne({ where: homeTeamId });
    const teamAway = await Team.findOne({ where: awayTeamId });
    if (!teamHome || !teamAway) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  }
}
