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
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    sets: [{
        type: SetSchema
    }]
}, { timestamps: true })

export const Workout = models?.Workout || model("Workout", WorkoutSchema);