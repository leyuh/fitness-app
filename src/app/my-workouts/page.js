"use client"

import { useState, useEffect } from "react";

import Link from "next/link";

import WorkoutItem from "@/components/WorkoutItem";
import Plus from "@/icons/Plus";

export default function MyWorkouts() {

    const [myWorkouts, setMyWorkouts] = useState([]);

    useEffect(() => {
        fetch("/api/workouts").then(res => {
            res.json().then(data => {
                setMyWorkouts(data);
            })
        })
    }, [])

    return (
        <section id="my-workouts" className="mt-8">
            <h1 className="text-center text-3xl font-bold text-white">My Workouts</h1>

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