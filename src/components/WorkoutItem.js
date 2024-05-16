import Edit from "@/icons/Edit";
import Play from "@/icons/Play";
import Link from "next/link";

export default function WorkoutItem(props) {
    const {
        _id,
        creator,
        name,
        desc,
        sets
    } = props;

    return <li className="workout-item mt-4 w-full bg-background2 p-4 rounded-sm flex">
        <div>
            <h4 className="font-bold text-2xl text-gray-100">{name}</h4>
            <p className="text-primary text-sm">{desc}</p>
            <p className="text-gray-400 text-sm">by {creator}</p>
        </div>

        <div className="flex ml-auto gap-4">
            <Link
                href={`/play/${_id}`}
                className="button w-8 h-8 text-primary icon-transition"
            >
                <Play 
                    dimensions={"w-8 h-full"}
                />
            </Link>

            <Link
                href={`/my-workouts/edit/${_id}`}
                className="button w-8 h-8 text-primary icon-transition"
            >
                <Edit 
                    dimensions={"w-6 h-full"}
                />
            </Link>
        </div>
    </li>
}