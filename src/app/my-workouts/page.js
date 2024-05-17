"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import WorkoutItem from "@/components/WorkoutItem";
import Plus from "@/icons/Plus";

import { PlayBtn, EditBtn, SaveBtn, UnsaveBtn } from "@/components/WorkoutItemButtons";
import { redirect } from "next/navigation";

export default function MyWorkouts() {

    const [myWorkouts, setMyWorkouts] = useState([]);
    const { data: session, status } = useSession();


    const myWorkoutsFilter = (w) => (w.savers.indexOf(session?.user?._id) !== -1) || (w.creator === session?.user.username && !w.published);

    const fetchMyWorkouts = async () => {
        fetch("/api/workouts").then(res => {
            res.json().then(data => {
                setMyWorkouts(data.filter(myWorkoutsFilter));
            })
        })
    }

    useEffect(() => {
        console.log(session?.user);
        fetchMyWorkouts();
    }, [status])

    useEffect(() => {
        fetchMyWorkouts();
    }, [])

    if (status === "unauthenticated") {
        return redirect("/auth");
    }

    return (
        <section id="my-workouts" className="mt-8">
            <h1 className="text-center text-3xl font-bold text-white">My Workouts</h1>

            <div className="max-w-xl mx-auto">

                {myWorkouts.length === 0 ? (
                    <div className="text-center mx-auto mt-8">
                        <span className="text-white text-lg text-center">
                            No workouts yet! <Link
                                href="/my-workouts/new"
                                className="underline"
                            >Create one</Link> or <Link
                                href="/browse"
                                className="underline"
                            >Browse</Link>
                        </span>
                    </div>
                ) : (<>
                    <ul className="workouts-list">
                        {myWorkouts.map((item, i) => (
                            <WorkoutItem 
                                workoutProps={item}
                                key={i}
                            >
                                <PlayBtn 
                                    workoutId={item._id}
                                />
                                {(!item.published && item.creator === session?.user?.username) && <EditBtn 
                                    workoutId={item._id}
                                />}
                                {(item.published) && <UnsaveBtn 
                                    userId={session?.user?._id}
                                    savers={item.savers}
                                    workoutId={item._id}
                                    setWorkouts={setMyWorkouts}
                                    filter={myWorkoutsFilter}
                                />}

                            </WorkoutItem>
                        ))}
                    </ul>

                    <Link href="/my-workouts/new" id="new-workout-btn" className="button w-6 h-6 mx-auto text-white">
                        <Plus 
                            dimensions="w-6 h-full"
                        />
                    </Link>
                </>)}
                
            </div>
        </section>
    );
}