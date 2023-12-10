const fs = require('fs');
const input = fs.readFileSync('./day8/input.txt', 'utf8');

(() => {
  const inputArr = input.split('\n');
  const instructions = inputArr[0].split('');
  const nodesArr = inputArr.slice(2);
  const nodesObj = {};

  nodesArr.forEach(node => {
    const nodeName = node.substring(0, 3);
    const nextLeft = node.substring(7, 10);
    const nextRight = node.substring(12, 15);
    nodesObj[nodeName] = [nextLeft, nextRight];
  });

  function calculateSteps(nodeName, finalNodeName) {
    if (!nodesObj[nodeName]) return console.error('Invalid node name', nodeName);

    let currentNode = nodesObj[nodeName];
    let numberOfSteps = 0;

    for (let i = 0; i < instructions.length; i++) {
      let nextNodeName = '';

      numberOfSteps++;

      nextNodeName = instructions[i] === 'L' ? currentNode[0] : currentNode[1];

      i = (nextNodeName.endsWith(finalNodeName)) ? instructions.length
        : (i === instructions.length - 1 ? -1 : i);

      currentNode = nodesObj[nextNodeName];
    }

    return numberOfSteps;
  }

  //part1();

  function part1() {
    console.log({ numberOfSteps: calculateSteps("AAA", "ZZZ") });
  }

  part2();

  function part2() {
    let currentNodes = Object.keys(nodesObj).filter(key => key.endsWith('A'));
    let totalSteps = 0;

    for (let i = 0; i < instructions.length; i++) {
      totalSteps += 1;
      let nextNodeNames = [];
      currentNodes.forEach(node => {
        nextNodeNames.push(instructions[i] === 'L' ? nodesObj[node][0] : nodesObj[node][1]);
      });

      i = (nextNodeNames.filter(nextNodeName => nextNodeName.endsWith('Z')).length === nextNodeNames.length) ? instructions.length
        : (i === instructions.length - 1 ? -1 : i);

      currentNodes = nextNodeNames;

    }

    console.log({ totalSteps });
  }

})();


/**
 * ["11A", "22A"]
 * 
 * 
 */