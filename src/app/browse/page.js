"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import WorkoutItem from "@/components/WorkoutItem";
import { PlayBtn, SaveBtn, UnsaveBtn, LikeBtn, UnlikeBtn } from "@/components/WorkoutItemButtons";

import { TARGETS } from "@/components/configs";

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

            <div className="w-full mt-4">
                <ul className="workouts-list">
                    {publishedWorkouts.sort((a, b) => {
                        if (a.likers.length < b.likers.length) return 1;
                        return -1;
                    }).map((item, i) => (
                        <WorkoutItem 
                            workoutProps={item}
                            key={i}
                        >
                            <PlayBtn />

                            {(status === "authenticated" && item.likers.indexOf(session?.user?._id) === -1 && item.published) ? (<LikeBtn 
                                userId={session?.user?._id}
                                likers={item.likers}
                                workoutId={item._id}
                                setWorkouts={setPublishedWorkouts}
                                filter={browseWorkoutsFilter}
                            />) : (status === "authenticated" && item.published && <UnlikeBtn 
                                userId={session?.user?._id}
                                likers={item.likers}
                                workoutId={item._id}
                                setWorkouts={setPublishedWorkouts}
                                filter={browseWorkoutsFilter}
                            />
                            )}

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