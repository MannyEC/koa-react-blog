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

function hexagonLayer(ctx, centerX, centerY, radis, strokeColor, fillColor) {
  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = 3;
  const nodes = hexagonNodes(centerX, centerY, radis);

  ctx.moveTo(nodes[5][0], nodes[5][1]);
  nodes.forEach((node) => {
    ctx.lineTo(node[0], node[1]);
  });

  ctx.stroke();
  ctx.closePath();
  ctx.fill();
}

function centerHexagon(ctx, centerX, centerY) {
  hexagonLayer(ctx, centerX, centerY, 76, LINE_COLOR, '#171d25');
  hexagonLayer(ctx, centerX, centerY, 65, LINE_COLOR, '#171d25');
}

function connectLine(ctx) {
  ctx.beginPath();
  ctx.strokeStyle = LINE_COLOR;
  ctx.lineWidth = 1;
  ctx.setLineDash([10, 5]);
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

const gridSection = (ctx, centerX, centerY, percent) => {
  const opacity = 1 - percent / 100 + 0.5;
  const gap = 10;
  ctx.beginPath();
  ctx.lineWidth = 0.2;
  // ctx.strokeStyle = `rgb(0, 228, 255, ${opacity})`;
  ctx.strokeStyle = `rgb(0, 228, 255, ${opacity})`;

  for (let i = 0; i < 6; i++) {
    // 水平上
    ctx.moveTo(centerX - 60 + i / 2 * gap, centerY - gap * i);
    ctx.lineTo(centerX + 60 - i / 2 * gap, centerY - gap * i);
    // 垂直左
    ctx.moveTo(centerX - gap * i, centerY - 60 + i / 2 * gap);
    ctx.lineTo(centerX - gap * i, centerY + 60 - i / 2 * gap);
    // 防止中间的线被重绘
    if (i) {
      // 水平下
      ctx.moveTo(centerX - 60 + i / 2 * gap, centerY + gap * i);
      ctx.lineTo(centerX + 60 - i / 2 * gap, centerY + gap * i);
      // 垂直右
      ctx.moveTo(centerX + gap * i, centerY - 60 + i / 2 * gap);
      ctx.lineTo(centerX + gap * i, centerY + 60 - i / 2 * gap);
    }
  }
  ctx.stroke();
  ctx.closePath();

  // 球
  ctx.beginPath();
  const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 70);
  grad.addColorStop(0, `rgb(0, 182, 204, ${opacity})`);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.arc(centerX, centerY, 70, 0, 2 * Math.PI, true);
  ctx.fill();
};

const loopFrame = (ctx, percent) => {
  ctx.clearRect(0, 0, 600, 600);
  centerHexagon(ctx, 200, 123);
  gridSection(ctx, 200, 123, percent);
  const truePercent = (percent === 100) ? 0 : percent + 1;
  requestAnimationFrame(() => loopFrame(ctx, truePercent));
};

export const draw = (ctx) => {
  requestAnimationFrame(() => loopFrame(ctx, 0));
};
