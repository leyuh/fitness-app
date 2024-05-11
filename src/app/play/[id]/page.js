"use client"
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Back from "@/icons/Back";
import Forward from "@/icons/Forward";
import PlayIcon from "@/icons/Play";
import Pause from "@/icons/Pause";

const ControlButton = ({ handler, children }) => (
    <button
        className="button bg-primary h-12 w-12 primary-gradient text-white"
        onClick={handler}
    >
        {children}
    </button>
)

export default function Play() {

    const { id } = useParams();

    const [name, setName] = useState("");
    const [sets, setSets] = useState([]);

    const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);

    const [currentSetIndex, setCurrentSetIndex] = useState(null);
    const [currentSetTimeRemaining, setCurrentSetTimeRemaining] = useState(0);

    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        fetch("/api/workouts").then(res => {
            res.json().then(data => {
                console.log(data);
                let workout = data.filter(item => item._id === id);
                if (workout.length > 0) {
                    workout = workout[0];
                    setName(workout.name);
                    setSets(workout.sets);
                    setCurrentSetIndex(0);
                }
            })
        })
    }, [])

    useEffect(() => {
        if (isPaused) return;
        console.log("!");
        const interval = setInterval(() => {
            setTotalTimeElapsed(prev => prev + 1)
        }, 1000);
    
        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        if (currentSetIndex === sets.length - 1 && currentSetTimeRemaining <= 0) {
            setIsPaused(true);
            return;
        }

        if (currentSetTimeRemaining <= 0) {
            setCurrentSetIndex(prev => Math.min(prev + 1, sets.length - 1));
        } else {
            setCurrentSetTimeRemaining(prev => prev - 1);
        }
    }, [totalTimeElapsed])

    useEffect(() => {
        console.log(currentSetIndex);
        setCurrentSetTimeRemaining(sets[currentSetIndex]?.duration);
    }, [currentSetIndex])


    const getCurrentSetProgressPercentage = () => {
        if (!sets[currentSetIndex]) return 0;
        return 100*((sets[currentSetIndex].duration - currentSetTimeRemaining) / sets[currentSetIndex].duration);
    }

    const getWorkoutProgress = () => {
        return 0;
    }


    return <section className="mt-8 max-w-xl mx-auto">
        <div className="flex items-center my-4">
            <Link href="/my-workouts" className="button w-10 h-10 text-white">
                <Back 
                    dimensions={"w-6 h-full"}
                />
            </Link>

            <h1 className="font-bold text-3xl text-white text-center grow">{name}</h1>
        </div>

        <div className="mt-8">
            <h2 className="font-bold text-2xl text-white text-center">{sets[currentSetIndex]?.name}</h2>

            <div className="circle-div w-64 h-64 block mx-auto my-4">
                <div className="rounded-full h-full w-full flex justify-center items-center" style={{
                    backgroundImage: `conic-gradient(#ff6219 ${getCurrentSetProgressPercentage()}%, #1e2021 ${getCurrentSetProgressPercentage()}%)`
                }}>
                    <div className="rounded-full bg-background w-[75%] h-[75%] flex items-center justify-center">
                        <h1 className="text-white text-6xl font-bold text-center">{currentSetTimeRemaining}</h1>
                    </div>
                </div>
            </div>

            
            <h2 className="font-bold text-2xl text-white text-center">
                Up next: {currentSetIndex < sets.length - 1 ? sets[currentSetIndex + 1].name : "Finished"}
            </h2>
        </div>

        <div className="mt-8">
            <h2 className="font-bold text-4xl text-white text-center">{`${getWorkoutProgress()}%`}</h2>

            <div className="flex gap-4 items-center justify-center">
                <ControlButton
                    handler={() => {
                        if (currentSetIndex === 0) {
                            setCurrentSetTimeRemaining(sets[currentSetIndex].duration);
                        } else {
                            setCurrentSetTimeRemaining(sets[currentSetIndex - 1].duration);
                            setCurrentSetIndex(prev => prev - 1);
                        }
                    }}
                >
                    <Back
                        dimensions="w-8 h-full"
                    />
                </ControlButton>

                <ControlButton
                    handler={() => setIsPaused(prev => !prev)}
                >
                    {isPaused ? <PlayIcon 
                        dimensions="w-8 h-full"
                    /> : <Pause 
                        dimensions="w-8 h-full"
                    />}
                </ControlButton>

                <ControlButton
                    handler={() => {
                        if (currentSetIndex === sets.length - 1) {
                            setCurrentSetTimeRemaining(sets[currentSetIndex].duration);
                        } else {
                            setCurrentSetTimeRemaining(sets[currentSetIndex + 1].duration);
                            setCurrentSetIndex(prev => prev + 1);
                        }

                    }}
                >
                    <Forward
                        dimensions="w-8 h-full"
                    />
                </ControlButton>
            </div>
        </div>

        


    </section>
}