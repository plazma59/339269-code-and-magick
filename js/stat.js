'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_SPACE = 50;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  var step = 5;
  while (step <= CLOUD_WIDTH) {
    ctx.quadraticCurveTo(x + step, y - 5, x + step + 5, y);
    step += 15;
  }
  step = 5;
  while (step <= CLOUD_HEIGHT) {
    ctx.quadraticCurveTo(x + CLOUD_WIDTH, y + step, x + CLOUD_WIDTH - 5, y + step + 5);
    step += 15;
  }
  step = 5;
  while (step <= CLOUD_WIDTH) {
    ctx.quadraticCurveTo(x + CLOUD_WIDTH - step, y + CLOUD_HEIGHT - 5, x + CLOUD_WIDTH - step - 5, y + CLOUD_HEIGHT);
    step += 15;
  }
  step = 5;
  while (step <= CLOUD_HEIGHT) {
    ctx.quadraticCurveTo(x + 5, y + CLOUD_HEIGHT - step, x, y + CLOUD_HEIGHT - step - 5);
    step += 15;
  }
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  var congratulations = ['Ура вы победили!', 'Список результатов:'];
  for (var i = 0; i < congratulations.length; i++) {
    ctx.fillText(congratulations[i], CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP * i);
  }

  var maxTime = getMaxElement(times);

  for (var j = 0; j < names.length; j++) {
    ctx.fillText(Math.floor(times[j]), CLOUD_X + GAP * 2 + BAR_SPACE * j + BAR_WIDTH * j, CLOUD_HEIGHT - BAR_HEIGHT / maxTime * times[j] - GAP * 3 - FONT_GAP);
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, 1)';
      ctx.globalAlpha = Math.random() + 0.2;
    }
    ctx.fillRect(CLOUD_X + GAP * 2 + BAR_SPACE * j + BAR_WIDTH * j, CLOUD_HEIGHT - BAR_HEIGHT / maxTime * times[j] - GAP - FONT_GAP, BAR_WIDTH, BAR_HEIGHT / maxTime * times[j]);
    ctx.fillStyle = '#000';
    ctx.globalAlpha = 1;
    ctx.fillText(names[j], CLOUD_X + GAP * 2 + BAR_SPACE * j + BAR_WIDTH * j, CLOUD_HEIGHT - GAP);
  }
};
