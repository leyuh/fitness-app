"use client"
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import { redirect } from "next/navigation";

export default function Edit() {

    const [name, setName] = useState("My Workout");
    const [desc, setDesc] = useState("");
    const [durationType, setDurationType] = useState(30);

    const [sets, setSets] = useState([]);

    const [redirectToWorkouts, setRedirectToWorkouts] = useState(false);

    const [published, setPublished] = useState(false);

    const { id } = useParams();


    useEffect(() => {
        fetch("/api/workouts").then(res => {
            res.json().then(data => {
                let workout = data.filter(item => item._id === id);
                console.log(workout);
                if (workout.length > 0) {
                    workout = workout[0];

                    setName(workout.name);
                    setDesc(workout.desc);
                    setSets(workout.sets);
                    setDurationType(workout.durationType);
                    setPublished(workout.published);
                }
            })
        })
    }, [])

    const handleSubmit = async (e, publish=false, publisher=null) => {
        console.log(published);
        e.preventDefault();

        let res = await fetch("/api/workouts", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                name,
                desc,
                sets,
                durationType,
                published: publish,
                savers: [publisher]
            })
        });

        setRedirectToWorkouts(true);
    };

    if (redirectToWorkouts) {
        return redirect("/my-workouts");
    };

    if (published) {
        return redirect("/my-workouts");
    }

    return <section className="mt-12">
        <WorkoutForm 
            formTitle={"Edit Workout"}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            desc={desc}
            setDesc={setDesc}
            sets={sets}
            setSets={setSets}
            durationType={durationType}
            setDurationType={setDurationType}
            setPublished={setPublished}
            buttonLabel={"Save"}
        />
        
    </section>

}