import {Request, Response } from 'express';
import {controller, httpPost, interfaces, request, requestBody, requestParam, response} from "inversify-express-utils";
import {CommentModel} from "../models/comment.model";
import {checkJwt} from "../auth/auth.service";
import {CommentService} from "../services/comment.service";
import {inject} from "inversify";

@controller('/api/comment', checkJwt)
export class CommentController implements interfaces.Controller {

    constructor(@inject('CommentService') private commentService: CommentService) { }

    @httpPost('/:matchId')
    private post(@requestBody() comment: CommentModel, @requestParam('matchId') matchId: number, @request() req: Request, @response() resp: Response) {
        const { user: { sub } } = req;
        try {
            this.commentService.saveMatchComment(matchId, sub, comment);
            resp.sendStatus(200);
        } catch (error) {
            resp.status(400).send(error.message);
        }
    }

}