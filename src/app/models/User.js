import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    savedWorkouts: [{
        type: Schema.Types.ObjectId
    }]
}, { timestamps: true })

export const User = models?.User || model("User", UserSchema);