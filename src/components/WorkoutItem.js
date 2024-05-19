import { calcTotalDuration } from "./configs";
import { formatDuration } from "./configs";

export default function WorkoutItem(props) {
    const {
        workoutProps,
        children
    } = props;

    const {
        _id,
        creator,
        name,
        desc,
        targets,
        sets,
        durationType
    } = workoutProps;

    return <li className="bg-gradient max-w-xl mx-auto workout-item mt-4 w-full bg-background2 p-4 gap-6 rounded-sm flex shadow-md">
        <div>
            <h4 className="font-bold text-[22px] text-white">{name}</h4>
            <div className="flex gap-2">
                <p className="text-white text-sm">{formatDuration(calcTotalDuration(sets, durationType))}</p>
                {targets.length > 0 ? (
                    <p className="text-primary text-sm">{targets.join(", ")}</p>
                ) : (
                    <p className="text-gray-400 text-sm line-clamp-1">{desc}</p>
                )}
                
            </div>
            
            <p className="text-gray-400 text-sm">by {creator}</p>
        </div>

        <div className="flex ml-auto gap-4">
            {children}
        </div>
    </li>
}