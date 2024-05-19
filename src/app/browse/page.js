"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import WorkoutItem from "@/components/WorkoutItem";
import { InfoBtn, PlayBtn, SaveBtn, UnsaveBtn, LikeBtn, UnlikeBtn } from "@/components/WorkoutItemButtons";

import { TARGETS } from "@/components/configs";
import { useSearchParams, useRouter } from "next/navigation";

export default function Browse() {

    const [publishedWorkouts, setPublishedWorkouts] = useState([]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedFilters = searchParams.get("target")?.split(",") || [];

    const [order, setOrder] = useState([]);

    const { data: session, status } = useSession();

    const browseWorkoutsFilter = (w) => w.published;

    const updateTargets = (target) => {
        console.log("!");
        if (selectedFilters.indexOf(target) === -1) {
            // add
            router.push(`?target=${[...selectedFilters, target].join(",")}`);
        } else {
            // remove
            if (selectedFilters.length === 1) {
                console.log("clear");
                router.push("?");
            } else {
                router.push(`?target=${selectedFilters.filter(val => val !== target).join(",")}`);
            }
            
        }
    }

    const fetchWorkouts = async (initial=false) => {
        fetch("/api/workouts").then(res => {
            res.json().then(data => {
                if (initial) {
                    setOrder(data.filter(browseWorkoutsFilter).sort((a, b) => {
                        if (a.likers.length < b.likers.length) return 1;
                        return -1;
                    }).map(workout => workout._id));
                }
                setPublishedWorkouts(data.filter(browseWorkoutsFilter).sort());
            })
        })
    }

    useEffect(() => {
        fetchWorkouts(true);
    }, [])


    return (
        <section id="my-workouts" className="mt-8">
            <h1 className="text-center text-3xl font-bold text-white">Published Workouts</h1>

            <div className="filter-div max-w-2xl justify-center rounded-sm mt-2 flex mx-auto gap-4 overflow-x-scroll pb-4">
                {TARGETS.map((target, i) => (
                    <button
                        key={i}
                        className={`h-6 leading-3 rounded-sm px-[6px] text-white my-0 ${selectedFilters.indexOf(target) === -1 ? "unselected" : "primary-gradient"}`}
                        onClick={() => updateTargets(target)}
                    >
                        {target}
                    </button>
                ))}
            </div>

            <div className="w-full mt-4">
                <ul className="workouts-list">
                    {publishedWorkouts.filter((item, i) => {
                        if (selectedFilters.length === 0) return true;
                        for (let j = 0; j < selectedFilters.length; j++) {
                            if (item.targets.indexOf(selectedFilters[j]) === -1) return false;
                        }
                        return true;
                    }).sort((a, b) => {
                        if (order.indexOf(a._id) > order.indexOf(b._id)) return 1;
                        return -1;
                    }).map((item, i) => (
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