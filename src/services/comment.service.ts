import { injectable } from "inversify";
import {CommentModel} from "../models/comment.model";
import {MatchComment} from "../models/matchComments.model";

@injectable()
export class CommentService {

    public saveMatchComment = async (matchId: number, gid: string, comment: CommentModel) => {
        let matchCommentObj = await MatchComment.find( { matchId: matchId });
        if (matchCommentObj.length == 0) {
            let newMatchComment = new MatchComment({
                matchId: matchId,
                comments: [comment]
            });
            await newMatchComment.save();
        } else {
            matchCommentObj[0].comments.push(comment);
            await matchCommentObj[0].save();
        }
    };

    public getMatchComments = async (matchId: number) => {
        let matchCommentObj = await MatchComment.find({ matchId: matchId });
        if (matchCommentObj.length == 0) {
            throw new Error('There are no comments for this match')
        } else {
            return matchCommentObj[0].comments;
        }
    }
}