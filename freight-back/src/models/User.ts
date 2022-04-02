import mongoose, { Document, Schema} from "mongoose";

export interface User {
    username: string,
    password: string
}

export interface UserModel extends User, Document {}

const UserSchema: Schema = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<UserModel>('User', UserSchema);