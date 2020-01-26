'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10; // отступ.

var CLOUD_X = 100; // начало координат по X.
var CLOUD_Y = 10; // начало координат по Y

var BAR_Y = 250;
var BAR_HEIGHT = -150; // Высота коллонки 150px.
var BAR_WIDTH = 40; // Ширина колонки 40px.
var BAR_GAP = 50; // Расстояние между колонками 50px.


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};


window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);


  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), BAR_GAP + CLOUD_X + i * (BAR_WIDTH + BAR_GAP), times[i] * BAR_HEIGHT / maxTime + (BAR_Y - 10));
    ctx.fillText(players[i], BAR_GAP + CLOUD_X + i * (BAR_WIDTH + BAR_GAP), CLOUD_HEIGHT);
    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(259, ' + Math.floor(Math.random() * 100) + '%, 40%)';
    ctx.fillRect(BAR_GAP + CLOUD_X + i * (BAR_WIDTH + BAR_GAP), BAR_Y, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};

