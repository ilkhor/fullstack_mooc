interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

const calculateRating = (avg: number, target: number): number => {
    if (avg > target) return 3;
    else if (avg > (target * 0.9)) return 2;
    return 1;
}

const ratingToTxt = (rating: number): string => {
    if (rating == 3) return "Awesome";
    else if (rating === 2) return "Good but can be improved";
    else return "You need to practice more"
}

const calculateExercises = (target: number, exercises: Array<number>): ExerciseResult => {

    const avg = exercises.reduce((a: number, b: number) => a + b) / exercises.length
    const rating = calculateRating(avg, target);
    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(i => i > 0).length,
        success: avg >= target,
        rating: rating,
        ratingDescription: ratingToTxt(rating),
        target: target,
        average: exercises.reduce((a: number, b: number) => a + b) / exercises.length
    };
}

interface InputValues {
    target: number,
    exercises: Array<number>
};

const parseInput = (args: Array<string>): InputValues => {
    return {
        target: Number(args[2]),
        exercises: args.slice(3).map(n => Number(n))
    }
};

const input = parseInput(process.argv);
console.log(calculateExercises(input.target, input.exercises));
