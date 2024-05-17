import mongoose from "mongoose";
import { Workout } from "@/app/models/Workout";

export async function GET () {
    mongoose.connect(process.env.MONGO_URL);

    return Response.json(await Workout.find());
}

export async function POST (req) {
    const body = await req.json();

    mongoose.connect(process.env.MONGO_URL);

    let updatedBody = {
        "creator": body.creator,
        "name": body.name,
        "desc": body.desc,
        "targets": body.targets,
        "sets": body.sets.map((set, i) => ({
            "name": set.name,
            "duration": set.duration || 0
        })),
        "durationType": body.durationType,
        "published": false,
        "savers": []
    }

    const newWorkout = await Workout.create(updatedBody);
    return Response.json(newWorkout);
}

export async function PUT (req) {
    const {id, ...body} = await req.json();

    mongoose.connect(process.env.MONGO_URL);

    const updatedWorkout = await Workout.findByIdAndUpdate(id, body);
    const workouts = await Workout.find();
    return Response.json(workouts);
}

export async function DELETE (req) {
    const { workoutId, username } = await req.json();

    mongoose.connect(process.env.MONGO_URL);

    const deletedWorkout = await Workout.findOneAndDelete({ _id: workoutId, creator: username })
    return Response.json(true);
}