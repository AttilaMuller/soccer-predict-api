import { Response } from 'express';
import {
    controller,
    httpGet,
    interfaces,
    requestParam,
    response
} from "inversify-express-utils";
import {inject} from "inversify";
import {StandingsService} from "../services/standings.service";

@controller('/api/standings')
export class StandingsController implements interfaces.Controller {

    constructor(@inject('StandingsService') private standingsService: StandingsService) { }

    // get standings of one competition
    @httpGet('/:id')
    private async get(@requestParam('id') id: number, @response() res: Response) {
        return this.standingsService.getStandings(id);
    }
}