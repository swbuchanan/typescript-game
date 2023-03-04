// Define the canvas and its dimensions
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const width = canvas.width;
const height = canvas.height;

// Define the input box for the function
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter a function (e.g. sin(x))';
document.body.appendChild(input);

// Define the range of x values to be plotted
const xMin = -10;
const xMax = 10;

// Define the scale factor for x and y values
const xScale = width / (xMax - xMin);
const yScale = height / 2;

// Define a function to parse and evaluate user input
function evaluateUserInput(x: number): number {
  const expression = input.value;
  const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
  const result = Function(`'use strict'; return ${sanitizedExpression}`)();
  return result;
}

// Draw the x and y axes
ctx.beginPath();
ctx.moveTo(0, height / 2);
ctx.lineTo(width, height / 2);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(width / 2, 0);
ctx.lineTo(width / 2, height);
ctx.stroke();

// Plot the function
ctx.beginPath();
ctx.moveTo(0, height / 2 - evaluateUserInput(xMin) * yScale);
for (let x = xMin; x <= xMax; x += 0.01) {
  const y = evaluateUserInput(x);
  ctx.lineTo((x - xMin) * xScale, height / 2 - y * yScale);
}
ctx.stroke();

