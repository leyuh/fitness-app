"use router"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COMPLETION_MESSAGES } from "./configs";

export default function CompletionPanel ({ showCompletionPanel, setShowCompletionPanel }) {

    const router = useRouter();

    const getRandomMessage = () => {
        return COMPLETION_MESSAGES[Math.floor(Math.random() * COMPLETION_MESSAGES.length)];
    }


    return <div className={`bg-background2 border-4 rounded-sm py-6 px-10 absolute top-[30%] mx-auto text-white block`}>
        <h1 className="text-primary font-bold text-center text-2xl mt-4">Workout Completed</h1>
        <h4 className="text-center font-bold text-lg mt-4">{getRandomMessage()}</h4>

        <div className="flex justify-center gap-4 mt-2">
            <button 
                className="button bg-primary primary-gradient w-24 h-10 font-bold text-lg text-white"
                onClick={() => {router.back()}}
            >
                Close
            </button>
        </div>
    </div>
}