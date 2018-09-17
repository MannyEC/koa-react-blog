import { gradientColor } from 'helpers/unitHelper';

const LINE_COLOR = '#00e4ff';

const colorSet = gradientColor('#6e30eb', '#00e4ff', 20);

// Anti-Clock rotate
function rotatePos(originX, originY, degree) {
  const afterX = originX * Math.cos(degree) + originY * Math.sin(degree);
  const afterY = -1 * originX * Math.sin(degree) + originY * Math.cos(degree);
  return [afterX, afterY];
}

function circleItem(ctx, centerX, centerY, radis, percent) {
  const rotateDegree = percent * 2 * Math.PI / 100;

  ctx.beginPath();
  ctx.strokeStyle = LINE_COLOR;
  ctx.lineWidth = 2;
  ctx.arc(centerX, centerY, radis, 25 / 24 * Math.PI, 47 / 24 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = LINE_COLOR;
  ctx.lineWidth = 2;
  ctx.arc(centerX, centerY, radis, 1 / 24 * Math.PI, 23 / 24 * Math.PI);
  ctx.stroke();

  // rotate
  ctx.resetTransform();
  ctx.translate(centerX, centerY);
  ctx.rotate(-1 * rotateDegree);
  ctx.translate(-centerX, -centerY);

  for (let i = 0; i < 20; i++) {
    const tmpD = i * 1 / 20 * Math.PI;
    ctx.beginPath();
    ctx.strokeStyle = colorSet[i];
    const tmpPosStart = rotatePos(0, 26, tmpD + Math.PI);
    const tmpPosEnd = rotatePos(0, 27 + tmpD * 2, tmpD + Math.PI);
    ctx.moveTo(tmpPosStart[0] + centerX, tmpPosStart[1] + centerY - 3);
    ctx.lineTo(tmpPosEnd[0] + centerX, tmpPosEnd[1] + centerY - 3);
    ctx.stroke();
  }
  ctx.resetTransform();
}

export const draw = (ctx, percent) => {
  ctx.clearRect(0, 0, 480, 100);
  circleItem(ctx, 60, 60, 37, percent);
  circleItem(ctx, 180, 60, 37, percent);
  circleItem(ctx, 310, 60, 37, percent);
  circleItem(ctx, 440, 60, 37, percent);
};
