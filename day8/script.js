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
  })

  let numberOfSteps = 0;
  let currentNode = nodesObj.AAA;

  for (let i = 0; i < instructions.length; i++) {
    let nextNodeName = '';

    numberOfSteps++;

    nextNodeName = instructions[i] === 'L' ? currentNode[0] : currentNode[1];

    i = (nextNodeName === 'ZZZ') ? instructions.length
      : (i === instructions.length - 1 ? -1 : i);

    currentNode = nodesObj[nextNodeName];
  }

  console.log({ numberOfSteps });

})();