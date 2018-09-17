const LINE_COLOR = '#00e4ff';

function getDegree(index) {
  return (index * 60) * Math.PI / 180;
}

function hexagonNodes(centerX, centerY, radis) {
  const ret = [];
  for (let i = 0; i < 6; i++) {
    const degree = getDegree(i);
    ret.push([centerX + radis * Math.cos(degree), centerY + radis * Math.sin(degree)]);
  }
  return ret;
}

function hexagonLayer(ctx, centerX, centerY, radis, strokeColor, fillColor, data = null) {
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  const nodes = hexagonNodes(centerX, centerY, radis);

  ctx.moveTo(nodes[5][0], nodes[5][1]);
  nodes.forEach((node) => {
    ctx.lineTo(node[0], node[1]);
  });

  ctx.stroke();
  ctx.closePath();
  ctx.fill();

  if (data) {
    ctx.beginPath();
    ctx.font = '24px MyriadPro-Regular';
    ctx.fillStyle = strokeColor;
    ctx.fillText(data.count, centerX - 10, centerY + 10);
    ctx.beginPath();
    ctx.font = '16px MicrosoftYaHei';
    ctx.fillStyle = 'white';
    ctx.fillText(data.name, centerX - 20, centerY + 50);
  }
}

function centerHexagon(ctx, centerX, centerY, sum) {
  hexagonLayer(ctx, centerX, centerY, 76, LINE_COLOR, '#171d25');
  hexagonLayer(ctx, centerX, centerY, 65, LINE_COLOR, '#171d25');

  ctx.beginPath();
  ctx.font = '47px MyriadPro-Regular';
  ctx.fillStyle = '#00e4ff';
  ctx.fillText(sum, centerX - 40, centerY + 10);
  ctx.beginPath();
  ctx.font = '16px MicrosoftYaHei';
  ctx.fillText('总数', centerX - 20, centerY + 30);
}

function connectLine(ctx) {
  ctx.strokeStyle = LINE_COLOR;
  ctx.lineWidth = 1;
  ctx.setLineDash([10, 5]);
  ctx.beginPath();
  ctx.moveTo(100, 30); // LT
  ctx.lineTo(160, 60);
  ctx.moveTo(300, 30); // RT
  ctx.lineTo(240, 60);

  ctx.moveTo(100, 220); // LB
  ctx.lineTo(160, 190);
  ctx.moveTo(300, 220); // RB
  ctx.lineTo(240, 190);

  ctx.moveTo(60, 120); // LM
  ctx.lineTo(120, 120);
  ctx.moveTo(280, 120); // RM
  ctx.lineTo(340, 120);

  ctx.stroke();
  ctx.closePath();
}

export const draw = (ctx, data) => {
  let sum = 0;
  data.forEach((item) => {
    sum += item.count;
  });

  centerHexagon(ctx, 200, 123, sum);
  hexagonLayer(ctx, 71, 27, 25, LINE_COLOR, '#171d25', data[0]);
  hexagonLayer(ctx, 30, 122, 25, LINE_COLOR, '#171d25', data[1]);
  hexagonLayer(ctx, 71, 220, 25, LINE_COLOR, '#171d25', data[2]);

  hexagonLayer(ctx, 330, 27, 25, LINE_COLOR, '#171d25', data[3]);
  hexagonLayer(ctx, 370, 122, 25, LINE_COLOR, '#171d25', data[4]);
  hexagonLayer(ctx, 330, 220, 25, LINE_COLOR, '#171d25', data[5]);

  connectLine(ctx);
};
