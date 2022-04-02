import mongoose, { Document, Schema} from "mongoose";

export interface Freight {
    name: string,
    type: string,
    weight: number,
    destination: string,
    owner_number: string,
    owner_email: string,
    is_deleted: boolean
}

export interface FreightModel extends Freight, Document {}

const FreightSchema: Schema = new Schema(
    {
        name: {type: String, required: true},
        type: {type: String, required: true},
        weight: {type: Number, required: true},
        destination: {type: String, required: true},
        owner_number: {type: String, required: true},
        owner_email: {type: String, required: true},
        is_deleted: {type: Boolean, required: true},
    },
    {
        versionKey: false
    }
);



export default mongoose.model<FreightModel>('Freight', FreightSchema);

