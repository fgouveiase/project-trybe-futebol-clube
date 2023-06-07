import { NextFunction, Request, Response } from 'express';
import * as teamService from '../services/TeamService';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const getTeams = await teamService.getAll();

    return res.status(200).json(getTeams);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const getTeamById = await teamService.getById(+id);

    return res.status(200).json(getTeamById);
  } catch (error) {
    next(error);
  }
}
