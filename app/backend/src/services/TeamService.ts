import httpError from '../utils/httpErr';
import Team from '../database/models/Team';

export async function getAll() {
  const allTeams = await Team.findAll();

  return allTeams;
}

export async function getById(id: number) {
  const foundTeam = await Team.findByPk(id);

  if (!foundTeam) throw httpError(404, 'Team not found');

  return foundTeam;
}
