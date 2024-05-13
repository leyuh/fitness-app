import mongoose from "mongoose";
import { Workout } from "@/app/models/Workout";

export async function GET () {
    mongoose.connect(process.env.MONGO_URI);

    return Response.json(await Workout.find());
}

export async function POST (req) {
    const body = await req.json();

    mongoose.connect(process.env.MONGO_URI);

    let updatedBody = {
        "name": body.name,
        "desc": body.desc,
        "sets": body.sets.map((set, i) => ({
            "name": set.name,
            "duration": set.duration || 0
        })),
        "durationType": body.durationType
    }

    const newWorkout = await Workout.create(updatedBody);
    return Response.json(newWorkout);
}

export async function PUT (req) {
    const { id, name, desc, sets, durationType } = await req.json();

    mongoose.connect(process.env.MONGO_URI);

    let updatedBody = {
        "name": name,
        "desc": desc,
        "sets": sets.map((set, i) => ({
            "name": set.name,
            "duration": set.duration || 0
        })),
        "durationType": durationType
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(id, updatedBody);
    return Response.json(true);
}