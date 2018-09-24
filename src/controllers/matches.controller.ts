import {Response } from 'express';
import {
    controller,
    httpPost,
    interfaces,
    requestBody,
    requestParam, response
} from "inversify-express-utils";
import {MatchesService} from "../services/matches.service";
import {inject} from "inversify";

@controller('/api/matches')
export class MatchesController implements interfaces.Controller {

    constructor(@inject('MatchesService') private matchService: MatchesService) { }

    // get previous or next 10 days matches for all competition
    @httpPost('/:period')
    private async post(@requestBody() competitions: number[], @requestParam('period') period: string, @response() resp: Response): Promise<any> {
        try {
            resp.status(200);
            return await this.matchService.getMatches(competitions, period);
        } catch(error) {
            resp.status(400).send(error.message);
        }
    }
}