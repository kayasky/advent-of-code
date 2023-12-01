import input from `./input.json` assert { type: "json" };

function getCalibrationValue(value) {
  return value;
}

input.values.forEach(value => {
  console.log(getCalibrationValue(value));
});