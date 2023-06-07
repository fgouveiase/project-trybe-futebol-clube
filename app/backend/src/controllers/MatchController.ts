import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchesController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { inProgress } = req.query;
      const allMatches = await MatchService.getAll(inProgress as string);
      res.status(200).json(allMatches);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public static async getMatchFinished(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await MatchService.getMatchFinished(id);
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public static async matchBody(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const matchBody = await MatchService.matchBody(id, homeTeamGoals, awayTeamGoals);
      res.status(200).json(matchBody);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public static async matchCreate(req: Request, res: Response): Promise<void> {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
      const createMatch = await MatchService.matchCreated(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
      res.status(201).json(createMatch);
    } catch (error) {
      res.status(404).json({ message: 'There is no team with such id!' });
    }
  }
}
