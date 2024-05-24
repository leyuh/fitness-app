"use client"

import Back from "@/icons/Back";
import Cancel from "@/icons/Cancel";
import Plus from "@/icons/Plus";
import Link from "next/link";

import WorkoutForm from "@/components/WorkoutForm";
import { redirect } from "next/navigation";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function NewWorkout() {
    const [name, setName] = useState("My Workout");
    const [desc, setDesc] = useState("");
    const [targets, setTargets] = useState([]);
    const [durationType, setDurationType] = useState(30);
    const { data: session, status } = useSession();

    const [sets, setSets] = useState([]);

    const [redirectToWorkouts, setRedirectToWorkouts] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        let res = await fetch("/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                creator: session?.user?.username,
                name,
                desc,
                sets,
                targets,
                durationType
            })
        });

        setRedirectToWorkouts(true);
    };

    if (redirectToWorkouts) {
        return redirect("/my-workouts");
    };

    return <section className="md:mt-8 w-[95vw] mx-auto md:w-full">
        <WorkoutForm 
            formTitle={"New Workout"}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            desc={desc}
            setDesc={setDesc}
            sets={sets}
            setSets={setSets}
            durationType={durationType}
            setDurationType={setDurationType}
            targets={targets}
            setTargets={setTargets}
            buttonLabel={"Create"}
        />
        
    </section>
}