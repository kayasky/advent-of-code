import input from `./input.json` assert { type: "json" };

// part 1
(() => {
  let sum = 0;

  function getCalibrationValue(value) {
    const int = value.split(/ /)[0].replace(/[^\d]/g, '');
    const intStr = int.toString();
    let calibrationValue = 0;
    if (!isNaN(int)) {
      calibrationValue = `${intStr[0]}${intStr[intStr.length - 1]}`;
    }
    return parseInt(calibrationValue);
  }

  input.values.forEach(value => { sum += getCalibrationValue(value) });

  console.log(sum);
})();

// part 2
(() => {
  const nums = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const spelledNumbers = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
  }
  let sum = 0;

  function parseValue(value) {
    let firstMatch = null;
    let lastMatch = null;
    let firstIndex = 9999;
    let lastIndex = -9999;

    for (let num of nums) {
      const regex = new RegExp(num, "g");
      let match;
      while ((match = regex.exec(value)) !== null) {
        if (match.index < firstIndex) {
          firstIndex = match.index;
          firstMatch = num;
        }
        if (regex.lastIndex > lastIndex) {
          lastIndex = regex.lastIndex;
          lastMatch = num;
        }
      }
    }

    return joinedFirstAndLast(firstMatch, lastMatch);
  }

  function joinedFirstAndLast(firstMatch, lastMatch) {
    return [firstMatch, lastMatch].map(item => (spelledNumbers[item] || item)).join("");
  }

  function getCalibrationValue(value) {
    return parseInt(parseValue(value));
  }

  input.values.forEach(value => { sum += getCalibrationValue(value) });

  console.log(sum);
})();
