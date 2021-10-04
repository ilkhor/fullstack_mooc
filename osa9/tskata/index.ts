import express from "express";
import {calculateBmi} from "./calculateBmi";
import {calculateExercises, ExerciseResult} from './calculateExercises';

const app = express();

app.use(express.json());
app.get('/hello', (_req, res) => {
    res.write('Hello Full Stack!');
    res.end();
});

app.get('/bmi', (req, res) => {

    const height = Number(req.query['height']);
    const weight = Number(req.query['weight']);

    if (!height || !weight) {
        res.json({
            error: "malformatted parameters"
        });
    } else {
        res.json({
            height,
            weight,
            bmi: calculateBmi(height, weight)
        });
    }


});

app.post('/exercises', (req, res) => {
    const target = req.body.target;
    const exercises = req.body.daily_exercises;

    if (!target || !exercises) {
        res.json({
            error: "malformatted parameters"
        });
    } else {
        const result: ExerciseResult = calculateExercises(target, exercises);
        res.json(result);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
