"use client"

import Back from "@/icons/Back";
import Cancel from "@/icons/Cancel";
import Plus from "@/icons/Plus";
import Link from "next/link";
import { redirect } from "next/navigation";

import { useState, useEffect } from "react";

const FormItem = ({ title, state, setState }) => {
    return (
        <div className="flex items-center my-4">
            <h2 className="w-40 text-primary text-lg font-bold capitalize">{title}</h2>
            <input
                type="text"
                id={title}
                placeholder={title}
                value={state}
                onChange={e => setState(e.target.value)}
                className="grow rounded-sm py-1 px-2"
            />
        </div>
    )
}

export default function NewWorkout() {

    const DURATION_OPTIONS = [30, 40, 45, "Custom"];

    const [name, setName] = useState("My Workout");
    const [desc, setDesc] = useState("");
    const [durationType, setDurationType] = useState(30);

    const [sets, setSets] = useState([]);

    const [redirectToWorkouts, setRedirectToWorkouts] = useState(false);

    useEffect(() => {
        if (durationType !== "Custom") {
            setSets(prev => prev.filter((set, i) => set.name !== "Rest").map((set, i) => ({
                "name": set.name,
                "duration": durationType
            })))
        }
    }, [durationType])

    const generateRests = (duration) => {
        let updatedSets = [];

        for (let i = 0; i < sets.length; i++) {
            updatedSets.push(sets[i]);

            if (i === sets.length - 1) continue;
            updatedSets.push({
                "name": "Rest",
                duration
            });
        }

        setSets(updatedSets);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (durationType !== "Custom") {
            generateRests(60-durationType);
            console.log(sets);
        }

        setRedirectToWorkouts(true);
    };

    if (redirectToWorkouts) {
        return redirect("/my-workouts");
    };
    
    return <section className="mt-12">

        <form onSubmit={handleSubmit} className="bg-background2 max-w-xl mx-auto rounded-sm px-6 py-2">

            <div className="flex items-center my-4">
                <Link href="/my-workouts" className="button w-10 h-10 text-white">
                    <Back 
                        dimensions={"w-6 h-full"}
                    />
                </Link>

                <h1 className="font-bold text-2xl text-white text-center grow">New Workout</h1>
            </div>

            <FormItem 
                title="name"
                state={name}
                setState={setName}
            />

            <FormItem 
                title="description"
                state={desc}
                setState={setDesc}
            />

            <div className="flex items-center">
                <h2 className="w-40 text-primary text-lg font-bold capitalize">Duration Type</h2>

                <div className="duration-options flex gap-2 ml-auto">
                    {DURATION_OPTIONS.map((option, i) => (
                        <button
                            type="button"
                            className={`text-white button h-8 w-16 ${durationType !== option ? "bg-primary" : "border-2 border-white"}`}
                            key={i}
                            onClick={() => setDurationType(option)}
                        >
                            {option !== "Custom" ? `${option}-${60-option}` : "Custom"}
                        </button>
                    ))}
                </div>
            </div>

            <h2 className="w-40 text-primary text-lg font-bold">Sets</h2>

            <div className="sets-div">
                <ul>
                    {sets.map((set, i) => (
                        <li key={i} className="mt-2 bg-background p-2 rounded-sm">
                            <input
                                type="text"
                                id={set.name}
                                value={sets[i].name}
                                placeholder={"name"}
                                disabled={set.name === "Rest"}
                                onChange={e => {
                                    let updatedSets = [...sets];
                                    updatedSets[i].name = e.target.value;
                                    setSets(updatedSets);
                                }}
                                className={`rounded-sm py-1 mx-2 px-2 grow ${set.name === "Rest" && "text-white bg-background font-bold"}`}
                            />

                            <button
                                type="button"
                                className="h-8 w-6 text-primary float-right"
                                onClick={() => {
                                    setSets(prev => [...prev].filter((set, j) => i !== j));
                                }}
                            >
                                <Cancel 
                                    dimensions={"w-6 h-full"}
                                />
                            </button>

                            {durationType === "Custom" && (
                                <input
                                    type="number"
                                    value={sets[i].duration}
                                    placeholder={30}
                                    onChange={e => {
                                        let updatedSets = [...sets];
                                        updatedSets[i].duration = e.target.value;
                                        setSets(updatedSets);
                                    }}
                                    className="rounded-sm py-1 px-2 mx-2 w-16 float-right"
                                />
                            )}
              
                        </li>
                    ))}
                </ul>

                <div className="gap-2 flex justify-end h-14 items-center">
                    <button
                        className="button w-20 h-8 bg-primary text-white"
                        type="button"
                        onClick={() => {
                            setSets(prev => [...prev, {
                                "name": "",
                                "duration": undefined
                            }])
                        }}
                    >
                        Add Set
                    </button>

                    {durationType === "Custom" && (
                        <button
                            className="button w-20 h-8 bg-primary text-white"
                            type="button"
                            onClick={() => {
                                setSets(prev => [...prev, {
                                    "name": "Rest",
                                    "duration": undefined
                                }])
                            }}
                        >
                            Add Rest
                        </button>
                    )}
                </div>

            </div>

            <button
                type="submit"
                className="button bg-primary w-24 h-10 font-bold text-lg text-white mx-auto"
            >Create</button>

        </form>
    </section>
}