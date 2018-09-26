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
        return matchCommentObj[0].comments;
    };

    public deleteComment = async (matchId: number, gid: string, comm: CommentModel) => {
        if (gid == comm.userId) {
            let matchCommentObj = await MatchComment.find( { matchId: matchId });
            matchCommentObj[0].comments = matchCommentObj[0].comments.filter((comment: CommentModel) => {
                return comment.date != comm.date;
            });
            await matchCommentObj[0].save();
        } else {
            throw new Error("Unauthorized")
        }
    };

    public getMatchCommentsSize = async () => {
        let matchCommentObj = await MatchComment.find();
        return matchCommentObj.map((commentObj: any) => ({
            matchId: commentObj.matchId,
            size: commentObj.comments.length
        }));
    }
}