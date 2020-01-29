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

var getColorByPlayer = function (player, sortedData) {
  if (player === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }

  var playerPosition = sortedData.findIndex(function (item) {
    return item.player === player;
  });
  var saturation = (100 / sortedData.length) * playerPosition;

  return 'hsl(235, ' + saturation + '%, 27%)';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var sortedData = players
    .reduce(function (accumulator, player, index) {
      accumulator.push({
        player: player,
        time: times[index]
      });

      return accumulator;
    }, [])
    .sort(function (a, b) {
      return a.time - b.time;
    });

  var maxTime = sortedData[sortedData.length - 1].time;

  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var time = Math.round(times[i]);

    var x = BAR_GAP + CLOUD_X + i * (BAR_WIDTH + BAR_GAP);

    ctx.fillStyle = '#000';
    ctx.fillText(time, x, (time * BAR_HEIGHT) / maxTime + (BAR_Y - 10));
    ctx.fillText(player, x, CLOUD_HEIGHT);
    ctx.fillStyle = getColorByPlayer(player, sortedData);
    ctx.fillRect(x, BAR_Y, BAR_WIDTH, (BAR_HEIGHT * time) / maxTime);
  }
};
