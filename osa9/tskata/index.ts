import express from "express";
import {calculateBmi} from "./calculateBmi";

const app = express();

app.get('/hello', (_req, res) => {
    res.write('Hello Full Stack!');
    res.end();
})

app.get('/bmi', (req, res) => {

    const height  = Number(req.query['height']);
    const weight  = Number(req.query['weight']);
    res.json({
        height,
        weight,
        bmi: calculateBmi(height, weight)
    })

})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
