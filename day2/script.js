import input from `./input.json` assert { type: "json" };

// part 1 & 2
(() => {
  const MaxCubes = {
    red: 12,
    green: 13,
    blue: 14,
  }
  const games = input.values;
  let sum = 0;
  let power = 0;

  calculateSumAndPower();

  console.log(sum);
  console.log(power);

  function calculateSumAndPower() {
    games.forEach((game, index) => {
      const gameId = index + 1;

      const reds = game.match(/[1-9][0-9]* red/g).map(cubes => parseInt(cubes));
      const fewestRed = Math.max(...reds);
      const greens = game.match(/[1-9][0-9]* green/g).map(cubes => parseInt(cubes));
      const fewestGreen = Math.max(...greens);
      const blues = game.match(/[1-9][0-9]* blue/g).map(cubes => parseInt(cubes));
      const fewestBlue = Math.max(...blues);

      if (fewestRed <= MaxCubes.red && fewestGreen <= MaxCubes.green && fewestBlue <= MaxCubes.blue) {
        sum += gameId;
      }

      power += (fewestRed * fewestGreen * fewestBlue);
    });
  }
})();