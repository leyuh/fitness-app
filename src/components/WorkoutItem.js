
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
        sets
    } = workoutProps;

    return <li className="workout-item mt-4 w-full bg-background2 p-4 rounded-sm flex">
        <div>
            <h4 className="font-bold text-2xl text-gray-100">{name}</h4>
            <p className="text-primary text-sm">{desc}</p>
            <p className="text-gray-400 text-sm">by {creator}</p>
        </div>

        <div className="flex ml-auto gap-4">
            {children}
        </div>
    </li>
}