const calculateBmi = (height: number, weight: number) => {
  // console.log('This is my BMI', weight / (height / 100) ** 2 );
  const x = weight / (height / 100) ** 2;
  if (x < 18.5) {
    return 'Underweight';
  } else if (x >= 18.5 && x < 25) {
    return 'Normal range';
  } else if (x >= 25 && x < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

console.log(calculateBmi(180, 100));

calculateBmi(178, 75);