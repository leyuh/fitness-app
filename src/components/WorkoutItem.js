const calcTotalDuration = (sets, durationType) => {
    let sum = 0;
    sets.map((set, i) => {
        sum += set.duration;
    })

    if (durationType === "Custom") return Math.max(0, sum);

    sum += ((sets.length - 1) * (60-durationType));

    return Math.max(0, sum);
}

const formatTotalDuration = (duration) => {
    return `${Math.floor(duration/60)}:${String((duration % 60)).padStart(2, "0")}`
}

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

    return <li className="workout-item mt-4 w-full bg-background2 p-4 gap-6 rounded-sm flex">
        <div>
            <h4 className="font-bold text-2xl text-white">{name}</h4>
            <div className="flex gap-2">
                <p className="text-white text-sm">{formatTotalDuration(calcTotalDuration(sets, durationType))}</p>
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