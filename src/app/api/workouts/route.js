import mongoose from "mongoose";
import { Workout } from "@/app/models/Workout";

export async function GET () {
    mongoose.connect(process.env.MONGO_URI);

    return Response.json(await Workout.find());
}

export async function POST (req) {
    const body = await req.json();

    mongoose.connect(process.env.MONGO_URI);

    const newWorkout = await Workout.create(body);
    return Response.json(newWorkout);
}