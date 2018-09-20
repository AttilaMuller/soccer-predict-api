import { injectable } from "inversify";
import axios from "axios";
import moment = require("moment");
import {MatchModel} from "../models/match.model";

@injectable()
export class MatchesService {

    API_MATCHES_URL = 'http://api.football-data.org/v2/matches';
    today = moment().format('YYYY-MM-DD');
    yesterday = moment().add(-1, 'days').format('YYYY-MM-DD');
    tenDaysEarlier = moment().add(-10, 'days').format('YYYY-MM-DD');
    tenDaysLater = moment().add(+10, 'days').format('YYYY-MM-DD');
    header = {headers: {'X-Auth-Token':  process.env.AUTH_TOKEN}};

    public getMatches = async (competitionArray: number[], period: string): Promise<MatchModel[]> => {
        let join = competitionArray.join(',');
        if (period === 'last') {
            const { data: {matches} } = await axios
                .get(`${this.API_MATCHES_URL}?competitions=${join}&dateFrom=${this.tenDaysEarlier}&dateTo=${this.yesterday}`, this.header);
            return matches.map((match: any) => ({
                id: match.id,
                competition: match.competition.name,
                date: moment.utc(match.utcDate).add(2, 'hours').format(),
                status: match.status,
                homeTeam: match.homeTeam.name,
                awayTeam: match.awayTeam.name,
                score: { winner: match.score.winner,
                    result: {
                        homeTeam: match.score.fullTime.homeTeam,
                        awayTeam: match.score.fullTime.awayTeam
                    },},
            }))
                .sort((a: MatchModel, b: MatchModel) => a.competition.localeCompare(b.competition))
                .sort((a: MatchModel, b: MatchModel) => a.date.localeCompare(b.date))
                .reverse();
        } else if (period === 'next') {
            const { data: {matches} } = await axios
                .get(`${this.API_MATCHES_URL}?competitions=${join}&dateFrom=${this.today}&dateTo=${this.tenDaysLater}`, this.header);
            return matches.map((match: any) => ({
                id: match.id,
                competition: match.competition.name,
                date: moment.utc(match.utcDate).add(2, 'hours').format(),
                status: match.status,
                homeTeam: match.homeTeam.name,
                awayTeam: match.awayTeam.name,
                score: { winner: match.score.winner,
                    result: {
                        homeTeam: match.score.fullTime.homeTeam,
                        awayTeam: match.score.fullTime.awayTeam
                    },},
            }))
                .sort((a: MatchModel, b: MatchModel) => a.competition.localeCompare(b.competition))
                .sort((a: MatchModel, b: MatchModel) => a.date.localeCompare(b.date));
        } else {
            throw new Error('Period parameter may only be next or last!')
        }

    };
}