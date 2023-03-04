// Define the canvas and its dimensions
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
// Define the input box for the function
var input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter a function (e.g. sin(x))';
document.body.appendChild(input);
// Define the range of x values to be plotted
var xMin = -10;
var xMax = 10;
// Define the scale factor for x and y values
var xScale = width / (xMax - xMin);
var yScale = height / 2;
// Define a function to parse and evaluate user input
function evaluateUserInput(x) {
    var expression = input.value;
    var sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
    var result = Function("'use strict'; return ".concat(sanitizedExpression))();
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
for (var x = xMin; x <= xMax; x += 0.01) {
    var y = evaluateUserInput(x);
    ctx.lineTo((x - xMin) * xScale, height / 2 - y * yScale);
}
ctx.stroke();
