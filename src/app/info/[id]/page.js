"use client"
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { calcTotalDuration } from "@/components/configs";
import { formatDuration } from "@/components/configs";

import { generateRests } from "@/components/configs"

import BackBtn from "@/components/BackBtn";

const InfoItem = ({ title, data }) => {
    return (
        <div className="grid gap-4 items-center mx-10 text-md text-left grid-cols-[30%_70%]">
            <h1 className="font-bold text-primary">{title}</h1>
            <p className="m-2">{data}</p>
        </div>
    )
}

export default function Info() {

    const { id } = useParams();

    const [workoutData, setWorkoutData] = useState(null);

    useEffect(() => {
        fetch("/api/workouts").then(res => {
            res.json().then(data => {
                let workout = data.filter(item => item._id === id);
                
                if (workout.length > 0) {
                    workout = workout[0];

                    if (workout.durationType !== "Custom") {
                        workout.sets = generateRests(60-workout.durationType, workout.sets);
                    }

                    console.log(workout);
                    setWorkoutData(workout);
                }
            })
        })
    }, [])

    return <section className="md:mt-8 w-[95vw] mx-auto md:w-full">
        <div className="bg-gradient max-w-lg max-h-[75vh] md:max-h-full mx-auto bg-background2 shadow-md p-4 text-center text-white">
            
            <div className="flex items-center md:mt-4">
                <BackBtn />
                <h1 className="font-bold text-xl md:text-3xl grow">{workoutData?.name}</h1>
            </div>

            <h3 className="text-gray-400 -mt-4 mb-4">by {workoutData?.creator}</h3>

            {workoutData?.targets.length > 0 && (
                <InfoItem 
                    title={"Targets"}
                    data={workoutData?.targets.join(", ")}
                />
            )}
            
            {workoutData?.desc && (
                <InfoItem 
                    title={"Description"}
                    data={workoutData?.desc}
                />
            )}

            <InfoItem 
                title={"Duration"}
                data={formatDuration(calcTotalDuration(workoutData?.sets, workoutData?.durationType, false))}
            />

            <ul className="max-w-xs mx-auto mt-4 max-h-[40vh] overflow-y-scroll px-2">
                {workoutData?.sets.map((set, i) => (
                    <li key={i} className={`${set.name === "Rest" ? "text-gray-400" : ""} font-bold text-lg flex gap-4 my-2`}>
                        <span className="text-left w-full">{set.name}</span>
                        <span className="w-20 text-right">{formatDuration(set.duration)}</span>
                    </li>
                ))}
            </ul>

        </div>
    </section>
}