const fs = require('fs');
const input = fs.readFileSync('./day11/input.txt', 'utf8');

(() => {
  let numberofGalaxies = 0;
  const expansionFactor = 1000000;
  const expandedRows = [];
  const expandedColumns = [];
  const inputGrid = input.split('\n').map(row => row.split(''));
  const expandedGrid = expandGrid(inputGrid);
  console.log(expandedGrid.join('\n').replace(/,/g, ''));
  let sumOfAllLengths = 0;

  function expandGrid(inputGrid) {
    let outputGrid = expandGridVertically(inputGrid);
    numberofGalaxies = expandGridHorizontally(outputGrid);
    return outputGrid;
  }

  // all possible pairs:
  let allPairs = [];
  for (let i = 1; i <= numberofGalaxies; i++) {
    for (let j = i + 1; j <= numberofGalaxies; j++) {
      allPairs.push([i, j]);
    }
  }

  allPairs.forEach(pair => {
    const galaxy1Coords = getCoordinatesOfGalaxy(expandedGrid, pair[0]);
    const galaxy2Coords = getCoordinatesOfGalaxy(expandedGrid, pair[1]);

    const numOfExpandedRowsInBetween = expandedRows.filter(row => row > Math.min(galaxy1Coords[0], galaxy2Coords[0]) && row < Math.max(galaxy1Coords[0], galaxy2Coords[0])).length;
    const numOfExpandedColumnsInBetween = expandedColumns.filter(col => col > Math.min(galaxy1Coords[1], galaxy2Coords[1]) && col < Math.max(galaxy1Coords[1], galaxy2Coords[1])).length;

    if (galaxy1Coords[0] > galaxy2Coords[0]) {
      galaxy1Coords[0] += (numOfExpandedRowsInBetween * expansionFactor) - numOfExpandedRowsInBetween;
    } else if (galaxy1Coords[0] < galaxy2Coords[0]) {
      galaxy2Coords[0] += (numOfExpandedRowsInBetween * expansionFactor) - numOfExpandedRowsInBetween;
    }

    if (galaxy1Coords[1] > galaxy2Coords[1]) {
      galaxy1Coords[1] += (numOfExpandedColumnsInBetween * expansionFactor) - numOfExpandedColumnsInBetween;
    } else if (galaxy1Coords[1] < galaxy2Coords[1]) {
      galaxy2Coords[1] += (numOfExpandedColumnsInBetween * expansionFactor) - numOfExpandedColumnsInBetween;
    }

    sumOfAllLengths += Math.abs(galaxy1Coords[0] - galaxy2Coords[0]) + Math.abs(galaxy1Coords[1] - galaxy2Coords[1]);
  });

  console.log(sumOfAllLengths);

  function getCoordinatesOfGalaxy(grid, galaxyName) {
    const galaxyXCoord = grid
      .findIndex(row => row.findIndex(element => element === galaxyName) !== -1);

    const galaxyYCoord = grid[galaxyXCoord].indexOf(galaxyName);

    return [galaxyXCoord, galaxyYCoord];
  }

  function expandGridVertically(inputGrid) {
    let outputGrid = [];
    for (let i = 0; i < inputGrid.length; i++) {
      outputGrid.push(inputGrid[i]);
      if (inputGrid[i].every(element => element === '.')) {
        //outputGrid.push(inputGrid[i].map(() => '.'));
        expandedRows.push(i);
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
      expandedColumns.push(col);
      // for (let k = 0; k < outputGrid.length; k++) {
      //   outputGrid[k].splice(col, 0, '.');
      // }
      // col += 1;
    }
    return col;
  }

})();
