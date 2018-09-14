import { injectable } from "inversify";
import axios from "axios";

@injectable()
export class StandingsService {

    header = {headers: {'X-Auth-Token': '79bd3dcbcdc94e6eab790053535c68d6'}};
    competitionIds: number[] = [2000,2001,2002,2003,2013,2014,2015,2016,2017,2018,2019,2021];

    public getStandings = async (id: number) => {
        if (!this.competitionIds.find((value: number) => value == id)) {
            throw new Error('Invalid competition id was provided')
        } if (id == 2001) {
            const { data: {standings} } = await axios.get(`http://api.football-data.org/v2/competitions/${id}/standings`, this.header);
            return standings.filter((standing: any) => standing.type == 'TOTAL');
        } else {
            const { data: {standings} } = await axios.get(`http://api.football-data.org/v2/competitions/${id}/standings`, this.header);
            return standings[0].table;
        }
    }
}