import Link from "next/link";

import Edit from "@/icons/Edit";
import Play from "@/icons/Play";
import Save from "@/icons/Save";
import Unsave from "@/icons/Unsave";


export const PlayBtn = ({ workoutId }) => {
    return (
        <Link
            href={`/play/${workoutId}`}
            className="button w-8 h-8 text-primary icon-transition"
        >
            <Play 
                dimensions={"w-8 h-full"}
            />
        </Link>
    )
}

export const EditBtn = ({ workoutId }) => {
    return (
        <Link
            href={`/my-workouts/edit/${workoutId}`}
            className="button w-8 h-8 text-primary icon-transition"
        >
            <Edit 
                dimensions={"w-6 h-full"}
            />
        </Link>
    )
}

export const SaveBtn = ({ userId, savers, workoutId, setWorkouts, filter }) => {
    return (<button
        onClick={async () => {
            console.log(userId, workoutId);
            const res = await fetch("/api/workouts", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: workoutId,
                    savers: [...savers, userId]
                })
            })
                .then(res => res.json())
                .then(data => {
                    setWorkouts(data.filter(filter));
                })
        }}
        className="button w-8 h-8 text-primary icon-transition"
    >
        <Save 
            dimensions={"w-6 h-full"}
        />
    </button>)
}

export const UnsaveBtn = ({ userId, savers, workoutId, setWorkouts, filter }) => {
    return (<button
        onClick={async () => {
            console.log(userId, workoutId);
            const res = fetch("/api/workouts", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: workoutId,
                    savers: savers.filter(val => val !== userId)
                })
            })
                .then(res => res.json())
                .then(data => {
                    setWorkouts(data.filter(filter));
                })

        }}
        className="button w-8 h-8 text-primary icon-transition"
    >
        <Unsave 
            dimensions={"w-6 h-full"}
        />
    </button>)
}