import { readFileSync } from 'fs';
const input = readFileSync('./day11/input.txt', 'utf8');

(() => {
  let numberofGalaxies = 0;
  const expansionFactor = 1000000; //set this to 2 for part 1
  const inputGrid = input.split('\n').map(row => row.split(''));

  const expandedRows = [];
  const expandedColumns = [];
  const expandedGrid = expandGrid(inputGrid);
  const allPairs = getAllPossiblePairs(numberofGalaxies);
  const sumOfAllLengths = getSumOfAllLengths(allPairs, expandedGrid);

  console.log(`The answer is: `, sumOfAllLengths);

  function expandGrid(inputGrid) {
    let outputGrid = expandGridVertically(inputGrid);
    numberofGalaxies = expandGridHorizontally(outputGrid);
    return outputGrid;
  }

  function getSumOfAllLengths(pairsOfGalaxies, grid) {
    let sumOfAllLengths = 0;

    pairsOfGalaxies.forEach(pair => {
      const galaxy1Coords = getCoordinatesOfGalaxy(grid, pair[0]);
      const galaxy2Coords = getCoordinatesOfGalaxy(grid, pair[1]);

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

    return sumOfAllLengths;
  }

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
      if (inputGrid[i].every(element => element === '.') && expandedRows.indexOf(i) === -1) {
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
    if (isColumnEmpty && expandedColumns.indexOf(col) === -1) {
      expandedColumns.push(col);
    }
    return col;
  }

  function getAllPossiblePairs(numberofGalaxies) {
    const allPairs = [];
    for (let i = 1; i <= numberofGalaxies; i++) {
      for (let j = i + 1; j <= numberofGalaxies; j++) {
        allPairs.push([i, j]);
      }
    }
    return allPairs;
  }

})();