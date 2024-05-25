"use client"
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Back from "@/icons/Back";
import Forward from "@/icons/Forward";
import PlayIcon from "@/icons/Play";
import Pause from "@/icons/Pause";

import Loader from "@/components/Loader";

import { generateRests } from "@/components/configs"
import BackBtn from "@/components/BackBtn";
import CompletionPanel from "@/components/CompletionPanel";

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

    const [showCompletionPanel, setShowCompletionPanel] = useState(false);

    const [loading, setLoading] = useState(true);

    const TIMER_DURATION = 5;


    useEffect(() => {
        fetch("/api/workouts").then(res => {
            res.json().then(data => {
                let workout = data.filter(item => item._id === id);
                
                if (workout.length > 0) {
                    workout = workout[0];

                    if (workout.durationType !== "Custom") {
                        workout.sets = generateRests(60-workout.durationType, workout.sets);
                    }
                    
                    workout.sets = [{
                        "name": "Get ready!",
                        "duration": TIMER_DURATION
                    }, ...workout.sets];

                    console.log(workout.sets);
                    setName(workout.name);
                    setSets(workout.sets);

                    setCurrentSetIndex(0);
                    setLoading(false);
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
            setShowCompletionPanel(true);
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

    if (loading) return <Loader />
    
    return <section className="-mt-8 md:mt-0 max-w-xl mx-auto justify-center flex flex-col items-center">

        <div className="flex items-center my-4 gap-10 w-full">
            <BackBtn />

            <h1 className="font-bold text-2xl -ml-10 md:text-3xl text-white text-center grow w-full">{name}</h1>
        </div>

        <div className="-mt-4 md:mt-0">
            <h2 className="font-bold text-2xl text-white text-center">{sets[currentSetIndex]?.name}</h2>

            <div className="circle-div w-64 h-64 block mx-auto my-4">
                <div className="shadow-xl rounded-full h-full w-full flex justify-center items-center" style={{
                    backgroundImage: `conic-gradient(#ff6219 ${getCurrentSetProgressPercentage()}%, #1e2021 ${getCurrentSetProgressPercentage()}%)`
                }}>
                    <div className="rounded-full bg-background w-[65%] h-[65%] flex items-center justify-center">
                        <h1 className="text-white text-7xl font-bold text-center">{currentSetTimeRemaining}</h1>
                    </div>
                </div>
            </div>

            
            <h2 className="font-bold text-2xl text-white text-center">
                Up next: {currentSetIndex < sets.length - 1 ? sets[currentSetIndex + 1].name : "Finished"}
            </h2>
        </div>

        <div className="">

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
                    handler={() => {
                        setIsPaused(prev => !prev);
                    }}
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

        {showCompletionPanel && <CompletionPanel/>}


    </section>
}