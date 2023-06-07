import Team from '../database/models/Team';
import Match from '../database/models/Match';

interface matchAttribute {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class MatchService {
  public static async getAll(trueOrFalse: string): Promise<Match[]> {
    if (trueOrFalse) {
      const boolOptions = trueOrFalse === 'true' || 'false';
      const progressMatches = await Match.findAll({
        where: { inProgress: boolOptions },
        include: [
          { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ] });
      return progressMatches;
    }
    const allMatches = await Match.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });

    return allMatches;
  }

  public static async getMatchFinished(id: string): Promise<Match | unknown> {
    const findMatch = await Match.findByPk(id);
    if (!findMatch) throw new Error('Match not found');
    if (findMatch.inProgress === false) throw new Error('Match finished');
    findMatch.inProgress = false;
    await findMatch.save();
    return findMatch;
  }

  public static async matchBody(
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Match | unknown> {
    const foundMatch = await Match.findByPk(id);
    if (!foundMatch) throw new Error('Match not found');
    if (foundMatch.inProgress === false) throw new Error('Match in progress');
    foundMatch.homeTeamGoals = homeTeamGoals;
    foundMatch.awayTeamGoals = awayTeamGoals;
    await foundMatch.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
    return foundMatch;
  }

  public static async getHomeTimeById(id: number) {
    const allMatches = await Match.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: { exclude: ['id'] } }, {
        model: Team,
        as: 'awayTeam',
        attributes: { exclude: ['id'] } }] });
    return allMatches;
  }

  public static async getAwayTimeById(id: number) {
    const allMatches = await Match.findAll({
      where: { awayTeamId: id, inProgress: false },
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: { exclude: ['id'] } }, {
        model: Team,
        as: 'awayTeam',
        attributes: { exclude: ['id'] } }] });
    return allMatches;
  }

  public static async matchCreated(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<matchAttribute | Match> {
    const match = await Match.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  }
}
