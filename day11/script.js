const fs = require('fs');
const input = fs.readFileSync('./day11/input.txt', 'utf8');

(() => {
  const inputGrid = input.split('\n').map(row => row.split(''));
  //console.log(inputGrid);
  const expandedGrid = expandGrid(inputGrid);
  console.log(expandedGrid.join('\n').replace(/,/g, ''));

  function expandGrid(grid) {
    let outputGrid = [];

    for (let i = 0; i < grid.length; i++) {
      outputGrid.push(grid[i]);
      if (grid[i].every(element => element === '.')) {
        outputGrid.push(grid[i].map(() => '.'));
      }
    }

    for (let col = 0; col < outputGrid[0].length; col++) {
      isColumnEmpty = true;
      for (let row = 0; row < outputGrid.length; row++) {
        if (outputGrid[row][col] !== '.') {
          isColumnEmpty = false;
          break;
        } else if (row === outputGrid.length - 1) {
          if (isColumnEmpty) {
            for (let k = 0; k < outputGrid.length; k++) {
              outputGrid[k].splice(col, 0, '.');
            }
            col += 1;
          }
        }
      }
    }
    return outputGrid;
  }

})();