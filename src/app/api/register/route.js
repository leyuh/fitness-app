import mongoose from "mongoose";
import { User } from "@/app/models/User";
import bcrypt from "bcrypt";

export async function POST (req) {
    const body = await req.json();

    mongoose.connect(process.env.MONGO_URL);

    const pass = body.password;

    if (!pass?.length || pass.length < 5) {
        new Error("password must be at least 5 characters");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(pass, salt);

    body.password = hashedPass;

    const newUser = await User.create({
        ...body,
        savedWorkouts: []
    });

    return Response.json(newUser);
}

