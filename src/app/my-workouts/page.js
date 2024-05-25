"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import WorkoutItem from "@/components/WorkoutItem";
import Plus from "@/icons/Plus";

import { InfoBtn, PlayBtn, EditBtn, SaveBtn, UnsaveBtn, LikeBtn, UnlikeBtn } from "@/components/WorkoutItemButtons";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";

export default function MyWorkouts() {

    const [myWorkouts, setMyWorkouts] = useState([]);
    const { data: session, status } = useSession();

    const [loading, setLoading] = useState(true);


    const myWorkoutsFilter = (w) => (w.savers.indexOf(session?.user?._id) !== -1) || (w.creator === session?.user.username && !w.published);

    const fetchMyWorkouts = async () => {
        fetch("/api/workouts").then(res => {
            res.json().then(data => {
                setMyWorkouts(data.filter(myWorkoutsFilter));

                setLoading(false);
            })
        })
    }

    useEffect(() => {
        fetchMyWorkouts();
    }, [status])

    useEffect(() => {
        fetchMyWorkouts();
    }, [])

    return (
        <section id="my-workouts" className="w-[95vw] mx-auto md:mt-8 md:w-full">
            <h1 className="text-center text-3xl font-bold text-white">My Workouts</h1>

            {loading ? (
                <Loader />
            ) : (
                <div className="w-full mt-4">

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
                        <ul className="workouts-list max-h-[60vh] w-full overflow-y-scroll">
                            {myWorkouts.map((item, i) => (
                                <WorkoutItem 
                                    workoutProps={item}
                                    key={i}
                                >
                                    <InfoBtn 
                                        workoutId={item._id}
                                    />
                                    <PlayBtn 
                                        workoutId={item._id}
                                    />
                                    {(item.likers.indexOf(session?.user?._id) === -1 && item.published) ? (<LikeBtn 
                                        userId={session?.user?._id}
                                        likers={item.likers}
                                        workoutId={item._id}
                                        setWorkouts={setMyWorkouts}
                                        filter={myWorkoutsFilter}
                                    />) : (item.published && <UnlikeBtn 
                                        userId={session?.user?._id}
                                        likers={item.likers}
                                        workoutId={item._id}
                                        setWorkouts={setMyWorkouts}
                                        filter={myWorkoutsFilter}
                                    />
                                    )}

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

                        <Link href="/my-workouts/new" id="new-workout-btn" className="button w-8 h-8 mx-auto text-white">
                            <Plus 
                                dimensions="w-8 h-full"
                            />
                        </Link>
                    </>)}
                    
                </div>
            )}
            
        </section>
    );
}