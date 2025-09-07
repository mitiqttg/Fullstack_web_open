interface ExerciseValues {
  target: number;
  days: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments'); 

  const raw = args.slice(2).map(Number);

  if (raw.some(isNaN)) {
    throw new Error('All provided values must be numbers!');
  }

  const [target, ...days] = raw;

  return { target, days };
};

const calculateExercises = (target: number, days: number[]) => {
    const periodLength = days.length;
    const trainingDays = days.filter(d => d > 0).length;
    const totalHours = days.reduce((a, b) => a + b, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
    const rating = Math.round((average / target) * 3);
    let ratingDescription = '';

    if (rating < 1) {
        ratingDescription = 'You need to work harder';
    } else if (rating >= 1 && rating < 2) {
        ratingDescription = 'Not too bad but could be better';
    } else {
        ratingDescription = 'Well done!';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
  const { target, days } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, days));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
