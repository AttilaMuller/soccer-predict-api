import {CommentModel} from "./comment.model";
import {Document, model, Schema} from "mongoose";

export interface MatchCommentsModel extends Document{
    matchId: number;
    comments: CommentModel[];
}

const MatchCommentSchema = new Schema({
    matchId: {
        type: Number,
        required: true
    },
    comments: {
        type: Array,
        required: true,
    }
});

export const MatchComment = model<MatchCommentsModel>('MatchComment', MatchCommentSchema);