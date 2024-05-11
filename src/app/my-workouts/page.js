"use client"

import { useState } from "react";

import Link from "next/link";

import WorkoutItem from "@/components/WorkoutItem";
import Plus from "@/icons/Plus";

export default function MyWorkouts() {

    const [myWorkouts, setMyWorkouts] = useState([
        {
            "name": "My Bicep Workout",
            "desc": "Lorem ipsum dolor sit amet",
            "duration": 120,
            "targets": ["biceps", "shoulders"],
            "sets": [
                {
                    "name": "Bicep curl",
                    "duration": 40
                },
                {
                    "name": "Rest",
                    "duration": 20
                },
                {
                    "name": "Hammer curl",
                    "duration": 40
                },
                {
                    "name": "Rest",
                    "duration": 20
                }
            ]
        },
        {
            "name": "My Tricep Workout",
            "desc": "Lorem ipsum dolor sit amet",
            "duration": 120,
            "targets": ["biceps", "shoulders"],
            "sets": [
                {
                    "name": "Bicep curl",
                    "duration": 40
                },
                {
                    "name": "Rest",
                    "duration": 20
                },
                {
                    "name": "Hammer curl",
                    "duration": 40
                },
                {
                    "name": "Rest",
                    "duration": 20
                }
            ]
        },
    ]);

    return (
        <section id="my-workouts" className="mt-8">
            <h1 className="text-center text-2xl font-bold text-white">My Workouts</h1>

            <div className="max-w-xl mx-auto">
                <ul className="workouts-list">
                    {myWorkouts.map((item, i) => (
                        <WorkoutItem 
                            {...item}
                            key={i}
                        />
                    ))}
                </ul>

                <Link href="/my-workouts/new" id="new-workout-btn" className="button w-6 h-6 mx-auto text-white">
                    <Plus 
                        dimensions="w-6 h-full"
                    />
                </Link>
            </div>
        </section>
    );
}