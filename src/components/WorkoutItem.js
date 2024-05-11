import Play from "@/icons/Play";
import Link from "next/link";

export default function WorkoutItem(props) {
    const {
        _id,
        name,
        desc,
        sets
    } = props;

    let creator = "me";

    return <li className="workout-item mt-4 w-full bg-background2 p-4 rounded-sm flex">
        <div>
            <h4 className="font-bold text-xl text-gray-100">{name}</h4>
            <p className="text-primary text-sm">{desc}</p>
            <p className="text-gray-400 text-sm">by {creator}</p>
        </div>

        <div className="flex ml-auto">
            <Link
                href={`/play/${_id}`}
                className="button w-8 h-8 text-white bg-primary primary-gradient"
            >
                <Play 
                    dimensions={"w-6 h-full"}
                />
            </Link>
        </div>
    </li>
}