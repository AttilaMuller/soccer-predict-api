import {Request, Response } from 'express';
import {
    controller,
    httpGet,
    httpPost,
    interfaces,
    request,
    requestBody,
    requestParam,
    response
} from "inversify-express-utils";
import {CommentModel} from "../models/comment.model";
import {checkJwt} from "../auth/auth.service";
import {CommentService} from "../services/comment.service";
import {inject} from "inversify";

@controller('/api/comment', checkJwt)
export class CommentController implements interfaces.Controller {

    constructor(@inject('CommentService') private commentService: CommentService) { }

    @httpPost('/:matchId')
    private async postCommentToMatch(@requestBody() comment: CommentModel, @requestParam('matchId') matchId: number, @request() req: Request, @response() resp: Response) {
        const { user: { sub } } = req;
        try {
            await this.commentService.saveMatchComment(matchId, sub, comment);
            return "";
        } catch (error) {
            resp.status(400);
            return error.message;
        }
    }

    @httpPost('/del/:matchId')
    private async updateComment(@requestBody() comment: CommentModel, @requestParam('matchId') matchId: number, @request() req: Request, @response() resp: Response) {
        const { user: { sub } } = req;
        try {
            await this.commentService.deleteComment(matchId, sub, comment);
            return "";
        } catch (error) {
            resp.status(400);
            return error.message;
        }
    }

    @httpGet('/:matchId')
    private async getCommentsFromMatch(@requestParam('matchId') matchId: number, @response() resp: Response): Promise<any> {
        try {
            return await this.commentService.getMatchComments(matchId);
        } catch(error) {
            resp.status(400);
        }
    }

}