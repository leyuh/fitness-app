export default function WorkoutItem(props) {
    const {
        name,
        desc,
        duration,
        targets,
        sets
    } = props;

    return <li className="workout-item mt-4 w-full bg-background2 p-4 rounded-sm">
        <div>
            <h4 className="font-bold text-xl text-gray-100">{name}</h4>
            <p className="text-primary text-md">{targets.join(", ")}</p>
        </div>

        <div>
            
        </div>
    </li>
}