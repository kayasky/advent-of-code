import input from `./input.json` assert { type: "json" };

(() => {
  const MaxCubes = {
    red: 12,
    green: 13,
    blue: 14,
  }
  const games = input.values;
  
  games.forEach((game, index) => {
    game.match(/[1-9][0-9]* red/g).forEach(cubes => console.log(cubes));
    game.match(/[1-9][0-9]* green/g).forEach(cubes => console.log(cubes));
    game.match(/[1-9][0-9]* blue/g).forEach(cubes => console.log(cubes));
    console.log('+-----------------+')
  });

})();