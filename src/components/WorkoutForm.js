import Link from "next/link";
import { useState, useEffect } from "react";
import Back from "@/icons/Back";
import Cancel from "@/icons/Cancel";
import FormItem from "./FormItem";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ConfirmationPanel from "./ConfirmationPanel";

import { TARGETS } from "./configs";
import BackBtn from "./BackBtn";

export default function WorkoutForm (props)  {


    const DURATION_OPTIONS = [30, 40, 45, "Custom"];

    const { data: session, status } = useSession();
    const router = useRouter();

    const [confirmationPanel, setConfirmationPanel] = useState(null);

    const {
        formTitle,
        handleSubmit,
        name,
        setName,
        desc,
        setDesc,
        sets,
        setSets,
        durationType,
        setDurationType,
        targets,
        setTargets,
        setPublished,
        buttonLabel,
        workoutId = null
    } = props;


    useEffect(() => {
        if (durationType !== "Custom") {
            setSets(prev => prev.filter((set, i) => set.name !== "Rest").map((set, i) => ({
                "name": set.name,
                "duration": durationType
            })))
        }
    }, [durationType])

    const updateTargets = (target) => {
        let index = targets.indexOf(target);
        if (index === -1) {
            setTargets(prev => [...prev, target]);
            return
        } else {
            let targetsCopy = [...targets];
            targetsCopy.splice(index, 1);
            setTargets(targetsCopy);
        }
    }



    return <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="bg-background2 bg-gradient w-full max-h-[75vh] md:max-h-full md:max-w-xl rounded-sm px-6 mx-4 py-2 shadow-md overflow-y-scroll md:overflow-y-hidden">
            <div className="flex items-center my-4">
                <BackBtn />

                <h1 className="font-bold text-3xl text-white text-center grow">{formTitle}</h1>
            </div>

            <div className="mt-[-20px] md:mt-0">
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
            </div>

            <div className="flex flex-col md:flex-row">
                <h2 className="md:w-40 text-primary text-left w-full text-sm md:text-lg font-bold capitalize">Targets</h2>
                <div className="grid grid-cols-3 gap-x-4 mt-1">
                    {TARGETS.map((target, i) => (
                        <div className="flex gap-2 items-center mt-1 md:mt-0" key={i}>
                            <input
                                type="checkbox"
                                id={target}
                                name={target}
                                value={target}
                                checked={targets.indexOf(target) !== -1}
                                onChange={() => updateTargets(target)}
                            />
                            <label className="text-white text-sm md:text-lg" htmlFor={target}>{target}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
                <h2 className="md:w-40 text-primary text-sm mt-3 md:mt-0 text-left w-full md:text-lg font-bold capitalize">Duration Type</h2>

                <div className="duration-options flex gap-4 -mt-3 md:gap-2 ml-auto w-full md:w-auto justify-center">
                    {DURATION_OPTIONS.map((option, i) => (
                        <button
                            type="button"
                            className={`text-white button h-8 w-16 ${durationType === option ? "primary-gradient bg-primary" : "border-[1px] border-white"}`}
                            key={i}
                            onClick={() => setDurationType(option)}
                        >
                            {option !== "Custom" ? `${option}-${60-option}` : "Custom"}
                        </button>
                    ))}
                </div>
            </div>

            <h2 className="w-40 text-primary text-sm md:text-lg font-bold">Sets</h2>

            <div className="sets-div">
                <ul className="max-h-[250px] overflow-y-scroll">
                    {sets.map((set, i) => (
                        <li key={i} className="mt-2 bg-background p-2 rounded-sm">
                            <input
                                type="text"
                                id={set.name}
                                value={set.name}
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
                        className="button w-20 h-8 primary-gradient bg-primary text-white"
                        type="button"
                        onClick={() => {
                            setSets(prev => [...prev, {
                                "name": "",
                                "duration": durationType === "Custom" ? undefined : durationType
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

            <div className="flex gap-4 justify-center">

                {workoutId && <button
                    type="button"
                    onClick={(e) => {
                        setConfirmationPanel({
                            message: "Are you sure you want to delete this workout?",
                            submessage: "This can not be undone.",
                            buttonText: "Delete",
                            handler: async (e) => {
                                const res = await fetch("/api/workouts", {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        workoutId,
                                        username: session?.user?.username
                                    })
                                });
                                router.replace("/my-workouts");
                            }
                        })
                    }}

                    className="button bg-primary primary-gradient w-24 h-10 font-bold text-lg text-white"
                >
                    Delete
                </button>}

                <button
                    type="submit"
                    className="button bg-primary primary-gradient w-24 h-10 font-bold text-lg text-white"
                >{buttonLabel}</button>

                {workoutId && <button
                    type="button"
                    onClick={(e) => {
                        setConfirmationPanel({
                            message: "Are you sure you want to publish this workout?",
                            submessage: "This will prevent you from making any future changes.",
                            buttonText: "Publish",
                            handler: (e) => {
                                setPublished(true);
                                handleSubmit(e, true, session?.user?._id);
                            }
                        })
                    }}
                    className="button bg-primary primary-gradient w-24 h-10 font-bold text-lg text-white"
                >
                    Publish
                </button>}

            </div>

        </form>

        {confirmationPanel && <ConfirmationPanel 
            data={confirmationPanel}
            setConfirmationPanel={setConfirmationPanel}
        />}
    </div>
}