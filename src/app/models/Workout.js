import { model, models, Schema } from "mongoose";

const SetSchema = new Schema({
    name: {
        type: String
    },
    duration: {
        type: Number
    }
})

const WorkoutSchema = new Schema({
    creator: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    sets: [{
        type: SetSchema
    }],
    durationType: {
        type: Schema.Types.Mixed,
        required: true
    }
}, { timestamps: true })

export const Workout = models?.Workout || model("Workout", WorkoutSchema);