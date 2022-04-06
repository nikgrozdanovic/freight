import mongoose, { Document, Schema} from "mongoose";

export interface RemovedFreight {
    name: string,
    type: string,
    weight: number;
    username: string;
    date: Date;
}

export interface RemovedFreightModel extends RemovedFreight, Document {}

const RemovedFreight: Schema = new Schema(
    {
        name: {type: String, required: true},
        type: {type: String, required: true},
        weight: {type: Number, required: true},
        username: {type: String, required: true},
        date: {type: Date, required: true}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<RemovedFreightModel>('RemovedFreight', RemovedFreight);