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

console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
