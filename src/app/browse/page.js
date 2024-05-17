"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import WorkoutItem from "@/components/WorkoutItem";
import { PlayBtn, SaveBtn, UnsaveBtn } from "@/components/WorkoutItemButtons";

export default function Browse() {

    const [publishedWorkouts, setPublishedWorkouts] = useState([]);
    const { data: session, status } = useSession();

    const browseWorkoutsFilter = (w) => w.published;

    const fetchWorkouts = async () => {
        fetch("/api/workouts").then(res => {
            res.json().then(data => {
                setPublishedWorkouts(data.filter(browseWorkoutsFilter));
            })
        })
    }

    useEffect(() => {
        fetchWorkouts();
    }, [])



    return (
        <section id="my-workouts" className="mt-8">
            <h1 className="text-center text-3xl font-bold text-white">Published Workouts</h1>

            <div className="max-w-xl mx-auto">
                <ul className="workouts-list">
                    {publishedWorkouts.map((item, i) => (
                        <WorkoutItem 
                            workoutProps={item}
                            key={i}
                        >
                            <PlayBtn />

                            {(status === "authenticated" && item.savers.indexOf(session?.user?._id) === -1) && <SaveBtn 
                                userId={session?.user?._id}
                                savers={item.savers}
                                workoutId={item._id}
                                setWorkouts={setPublishedWorkouts}
                                filter={browseWorkoutsFilter}
                            />}

                            {(status === "authenticated" && item.savers.indexOf(session?.user?._id) !== -1) && <UnsaveBtn 
                                userId={session?.user?._id}
                                savers={item.savers}
                                workoutId={item._id}
                                setWorkouts={setPublishedWorkouts}
                                filter={browseWorkoutsFilter}
                            />}

                        </WorkoutItem>
                    ))}
                </ul>
            </div>
        </section>
    );
}