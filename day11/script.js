const fs = require('fs');
const input = fs.readFileSync('./day11/input.txt', 'utf8');

(() => {
  let numberofGalaxies = 0;
  const inputGrid = input.split('\n').map(row => row.split(''));
  const expandedGrid = expandGrid(inputGrid);
  console.log(expandedGrid.join('\n').replace(/,/g, ''));

  function expandGrid(inputGrid) {
    let outputGrid = expandGridVertically(inputGrid);
    numberofGalaxies = expandGridHorizontally(outputGrid);
    return outputGrid;
  }

  // number of pairs:
  console.log(numberofGalaxies*(numberofGalaxies-1)/2);

})();

function expandGridVertically(inputGrid) {
  let outputGrid = [];
  for (let i = 0; i < inputGrid.length; i++) {
    outputGrid.push(inputGrid[i]);
    if (inputGrid[i].every(element => element === '.')) {
      outputGrid.push(inputGrid[i].map(() => '.'));
    }
  }
  return outputGrid;
}

function expandGridHorizontally(outputGrid) {
  let galaxyCount = 0;

  for (let col = 0; col < outputGrid[0].length; col++) {
    let isColumnEmpty = true;

    for (let row = 0; row < outputGrid.length; row++) {
      if (outputGrid[row][col] !== '.') {
        isColumnEmpty = false;
        galaxyCount += 1;
        outputGrid[row][col] = galaxyCount;
      } else if (row === outputGrid.length - 1) {
        col = insertSpaceInColumn(outputGrid, col, isColumnEmpty);
      }
    }
  }

  return galaxyCount;
}
function insertSpaceInColumn(outputGrid, col, isColumnEmpty) {
  if (isColumnEmpty) {
    for (let k = 0; k < outputGrid.length; k++) {
      outputGrid[k].splice(col, 0, '.');
    }
    col += 1;
  }
  return col;
}

