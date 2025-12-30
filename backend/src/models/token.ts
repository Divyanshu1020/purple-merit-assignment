import { InferSchemaType, model, Schema } from "mongoose";

const tokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})
export type TToken = InferSchemaType<typeof tokenSchema>;
const TokenModel = model<TToken>("Token", tokenSchema);
export default TokenModel;
