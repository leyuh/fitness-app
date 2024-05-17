export const TARGETS = [
    "Chest",
    "Delts",
    "Triceps",
    "Biceps",
    "Forearms",
    "Back",
    "Abs",
    "Quads",
    "Calves"
];

export const COMPLETION_MESSAGES = [
    "Way to go!",
    "Great job!",
    "Good work!",
    "Stunning performance!"
]

export const generateRests = (duration, sets) => {
    let updatedSets = [];

    for (let i = 0; i < sets.length; i++) {
        updatedSets.push(sets[i]);

        if (i === sets.length - 1) continue;
        updatedSets.push({
            "name": "Rest",
            "duration": duration
        });
    }

    return updatedSets;
}

export const calcTotalDuration = (sets, durationType, genRests=true) => {
    if (!sets || !durationType) return 0;

    let sum = 0;
    sets.map((set, i) => {
        sum += set.duration;
    })

    if (durationType === "Custom") return Math.max(0, sum);

    if (genRests) sum += ((sets.length - 1) * (60-durationType));

    return Math.max(0, sum);
}

export const formatDuration = (duration) => {
    return `${Math.floor(duration/60)}:${String((duration % 60)).padStart(2, "0")}`
}