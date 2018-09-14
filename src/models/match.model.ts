import {Score} from "./score.model";

export interface MatchModel {
    id: number;
    competition: string;
    date: string;
    status: string;
    homeTeam: string;
    awayTeam: string;
    score: Score;
}