import express from 'express';
import { calculateBmi } from './bmiCalculator';
// import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(parsedHeight, parsedWeight);

  return res.json({
    weight: parsedWeight,
    height: parsedHeight,
    bmi,
  });
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});