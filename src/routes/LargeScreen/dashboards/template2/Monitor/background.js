const LINE_COLOR = '#00e4ff';
const NODE_COLOR = 'rgba(9, 63, 79, 0.65)';
const SCAN_COLOR = 'rgba(0, 228, 255, 0.07)';
const MID_SCAN_COLOR = '#3366ff';

function Pos(x, y) {
  return { x, y };
}

/* init position here */
const centerPos = Pos(300, 350);
const trianglePos = {
  // 交点
  rightTop: Pos(centerPos.x + 50, centerPos.y - 150),
  rightBottom: Pos(centerPos.x + 170, centerPos.y + 50),
  bottomLeft: Pos(centerPos.x - 120, centerPos.y + 110),
  bottomRight: Pos(centerPos.x + 120, centerPos.y + 110),
  leftTop: Pos(centerPos.x - 50, centerPos.y - 150),
  leftBottom: Pos(centerPos.x - 170, centerPos.y + 50),
  // 节点
  nodeTop: Pos(centerPos.x, centerPos.y - 240),
  nodeRight: Pos(centerPos.x + 200, centerPos.y + 110),
  nodeLeft: Pos(centerPos.x - 200, centerPos.y + 110),
};

function getDegree(index) {
  return (30 - index * 60) * Math.PI / 180;
}

function hexagonNodes(centerX, centerY, radis) {
  const ret = [];
  for (let i = 0; i < 6; i++) {
    const degree = getDegree(i);
    ret.push([centerX + radis * Math.cos(degree), centerY + radis * Math.sin(degree)]);
  }
  return ret;
}

function hexagonLayer(ctx, centerX, centerY, radis, strokeStyle, fillColor, strokeWidth = 3) {
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = strokeWidth;
  const nodes = hexagonNodes(centerX, centerY, radis);

  ctx.moveTo(nodes[5][0], nodes[5][1]);
  nodes.forEach((node) => {
    ctx.lineTo(node[0], node[1]);
  });

  ctx.stroke();
  ctx.closePath();
  ctx.fill();
}

function fillHexagon(ctx, center, radis, percent) {
  ctx.beginPath();
  ctx.strokeStyle = SCAN_COLOR;
  ctx.fillStyle = SCAN_COLOR;
  ctx.lineWidth = 2;

  const degree = percent * Math.PI;
  const arcDegree = [Math.PI / 2 - degree, Math.PI / 2 + degree];
  ctx.arc(center.x, center.y, radis, arcDegree[0], arcDegree[1]);

  ctx.stroke();
  ctx.closePath();
  ctx.fill();
}

function hexagonItems(ctx, centerX, centerY, percent) {
  hexagonLayer(ctx, centerX, centerY, 110, '#02cee7', '#0d2532');
  hexagonLayer(ctx, centerX, centerY, 95, '#0e4653', '#0e4653');
  hexagonLayer(ctx, centerX, centerY, 82, 'transparent', '#171d25');

  fillHexagon(ctx, Pos(centerX, centerY), 80, percent);

  hexagonLayer(ctx, centerX, centerY, 90, '#0e4653', 'transparent', 10);
  hexagonLayer(ctx, centerX, centerY, 82, '#00e4ff', 'transparent');
}

// Anti-Clock rotate
function rotatePos(originX, originY, degree) {
  const afterX = originX * Math.cos(degree) + originY * Math.sin(degree);
  const afterY = -1 * originX * Math.sin(degree) + originY * Math.cos(degree);
  return [afterX, afterY];
}

function doubleCircle(ctx, centerX, centerY, radis, fromA, toA, withArrow, percent = null) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  // 外圈色渐隐处理
  if (percent) {
    const opacity = 1 - 0.8 * percent;
    ctx.strokeStyle = `rgb(0, 228, 255, ${opacity})`;
  }
  ctx.arc(centerX, centerY, radis, fromA, toA);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = LINE_COLOR;
  ctx.arc(centerX, centerY, radis - 10, fromA, toA);
  ctx.stroke();

  if (withArrow) {
    ctx.beginPath();
    ctx.fillStyle = LINE_COLOR;
    const pos01 = rotatePos(radis - 32, 0, -1 * toA);
    const pos02 = rotatePos(radis + 22, 0, -1 * toA);
    const pos03 = rotatePos(radis - 6, 28, -1 * toA);
    ctx.moveTo(pos01[0] + centerX, pos01[1] + centerY);
    ctx.lineTo(pos02[0] + centerX, pos02[1] + centerY);
    ctx.lineTo(pos03[0] + centerX, pos03[1] + centerY);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}

function circleArrow(ctx, centerX, centerY, percent) {
  doubleCircle(ctx, centerX, centerY, 264, 4 / 12 * Math.PI, 6 / 12 * Math.PI, true, percent);
  doubleCircle(ctx, centerX, centerY, 264, 7 / 12 * Math.PI, 8 / 12 * Math.PI, false, percent);

  doubleCircle(ctx, centerX, centerY, 264, 12 / 12 * Math.PI, 14 / 12 * Math.PI, true, percent);
  doubleCircle(ctx, centerX, centerY, 264, 15 / 12 * Math.PI, 16 / 12 * Math.PI, false, percent);

  doubleCircle(ctx, centerX, centerY, 264, 20 / 12 * Math.PI, 22 / 12 * Math.PI, true, percent);
  doubleCircle(ctx, centerX, centerY, 264, 23 / 12 * Math.PI, 24 / 12 * Math.PI, false, percent);
}

function miniTriangle(ctx, centerX, centerY, radis, rotate) {
  ctx.beginPath();
  ctx.fillStyle = LINE_COLOR;
  const pos01 = rotatePos(radis, 0, -1 * rotate);
  const pos02 = rotatePos(-1 * radis, 0, -1 * rotate);
  const pos03 = rotatePos(0, radis, -1 * rotate);
  ctx.moveTo(pos01[0] + centerX, pos01[1] + centerY);
  ctx.lineTo(pos02[0] + centerX, pos02[1] + centerY);
  ctx.lineTo(pos03[0] + centerX, pos03[1] + centerY);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

const getAllNodePos = (top) => {
  const gap = 15;
  const nodes = [];
  for (let i = 0; i <= 22; i++) {
    for (let j = 0; j < i / 5 * 3; j++) {
      nodes.push(Pos(top.x + j * gap, top.y + i * gap));
      nodes.push(Pos(top.x - j * gap, top.y + i * gap));
    }
  }
  return nodes;
};

function midTriangle(ctx) {
  const {
    rightTop,
    rightBottom,
    bottomLeft,
    bottomRight,
    leftTop,
    leftBottom,
    nodeTop,
  } = trianglePos;

  // fillWithNode
  const nodesPos = getAllNodePos(nodeTop);
  nodesPos.forEach((pos) => {
    ctx.beginPath();
    ctx.strokeStyle = NODE_COLOR;
    ctx.fillStyle = NODE_COLOR;
    ctx.arc(pos.x, pos.y, 1, Math.PI * 2, false);

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  });

  // 边界
  ctx.beginPath();
  ctx.strokeStyle = LINE_COLOR;
  ctx.lineWidth = 2;
  ctx.moveTo(rightTop.x, rightTop.y);
  ctx.lineTo(rightBottom.x, rightBottom.y);
  ctx.moveTo(leftTop.x, leftTop.y);
  ctx.lineTo(leftBottom.x, leftBottom.y);
  ctx.moveTo(bottomRight.x, bottomRight.y);
  ctx.lineTo(bottomLeft.x, bottomLeft.y);

  ctx.stroke();
  ctx.closePath();
}

/*
  计算直线路径上的点坐标
*/
function effectPoint(fromPos, endPos, percent) {
  const x = (endPos.x - fromPos.x) * percent + fromPos.x;
  const y = (endPos.y - fromPos.y) * percent + fromPos.y;
  return { x, y };
}

const lineScan = (ctx, percent) => {
  // 中间扫描区域
  const scanPointRight = effectPoint(trianglePos.nodeRight, trianglePos.nodeTop, percent);
  const scanPointLeft = effectPoint(trianglePos.nodeLeft, trianglePos.nodeTop, percent);

  const SCAN_GRADIENT = ctx.createRadialGradient(
    trianglePos.nodeTop.x,
    scanPointLeft.y,
    150,
    trianglePos.nodeTop.x,
    0, scanPointLeft.y - 72,
    200
  );
  SCAN_GRADIENT.addColorStop(0, '#00A2FF');
  SCAN_GRADIENT.addColorStop(1, 'transparent');

  ctx.beginPath();
  ctx.strokeStyle = MID_SCAN_COLOR;
  ctx.fillStyle = SCAN_GRADIENT;
  ctx.lineWidth = 2;
  ctx.moveTo(scanPointRight.x, scanPointRight.y);
  ctx.lineTo(scanPointLeft.x, scanPointLeft.y);
  ctx.lineTo(trianglePos.nodeTop.x, trianglePos.nodeTop.y);

  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

/* 绘制动态效果 */
function progressEffect(ctx, centerX, centerY, percent) {
  ctx.moveTo(centerX + 50, centerY - 150);
  ctx.lineTo(centerX + 170, centerY + 50);

  // 中间扫描线
  lineScan(ctx, percent);

  // 移动的箭头
  const linePointR = effectPoint(trianglePos.rightTop, trianglePos.rightBottom, percent);
  miniTriangle(ctx, linePointR.x, linePointR.y, 10, Math.PI * 11 / 6);

  const linePointL = effectPoint(trianglePos.leftBottom, trianglePos.leftTop, percent);
  miniTriangle(ctx, linePointL.x, linePointL.y, 10, Math.PI * 7 / 6);

  const linePointB = effectPoint(trianglePos.bottomRight, trianglePos.bottomLeft, percent);
  miniTriangle(ctx, linePointB.x, linePointB.y, 10, Math.PI * 1 / 2);
}

export const draw = (ctx, progress) => {
  const percent = progress / 100;

  ctx.clearRect(0, 0, 600, 600);
  progressEffect(ctx, 300, 350, percent);
  midTriangle(ctx);
  hexagonItems(ctx, 300, 120, percent);
  hexagonItems(ctx, 100, 460, percent);
  hexagonItems(ctx, 510, 460, percent);
  circleArrow(ctx, 300, 350, percent);
};
