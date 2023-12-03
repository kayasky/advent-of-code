import input from `./input.json` assert { type: "json" };

(() => {
  const MaxCubes = {
    red: 12,
    green: 13,
    blue: 14,
  }
  const games = input.values;
  let sum = 0;

  games.forEach((game, index) => {
    const gameId = index + 1;
    
    const reds = game.match(/[1-9][0-9]* red/g).map(cubes => parseInt(cubes));

    const greens = game.match(/[1-9][0-9]* green/g).map(cubes => parseInt(cubes));
    
    const blues = game.match(/[1-9][0-9]* blue/g).map(cubes => parseInt(cubes));

    if (Math.max(...reds) <= MaxCubes.red && Math.max(...greens) <= MaxCubes.green && Math.max(...blues) <= MaxCubes.blue) {
      sum += gameId;
    }
  });

  console.log(sum);
})();