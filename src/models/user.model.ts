import {Document, model, Schema} from "mongoose";

export interface UserModel extends Document {
    fullName: string;
    firstName: string;
    lastName: string;
    picture: string;
    gid: string;
}

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    gid: {
        type: String,
        required: true
    }
});

export const User = model<UserModel>('User', UserSchema);