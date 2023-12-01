import input from `./input.json` assert { type: "json" };

let sum = 0;

function getCalibrationValue(value) {
  const int = value.split(/ /)[0].replace(/[^\d]/g, '');
  const intStr = int.toString();
  let calibrationValue = 0;
  if (!isNaN(int)) {
    calibrationValue = `${intStr[0]}${intStr[intStr.length-1]}`;
  }
  return parseInt(calibrationValue);
}

input.values.forEach(value => { sum += getCalibrationValue(value)});

console.log(sum);