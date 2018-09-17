const LINE_COLOR = '#00e4ff';


// Anti-Clock rotate
function rotatePos(originX, originY, degree) {
  const afterX = originX * Math.cos(degree) + originY * Math.sin(degree);
  const afterY = -1 * originX * Math.sin(degree) + originY * Math.cos(degree);
  return [afterX, afterY];
}

function circleItem(ctx, centerX, centerY, radis, rotateDegree) {
  ctx.resetTransform();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateDegree);
  ctx.translate(-centerX, -centerY);

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

  for (let i = 0; i < Math.PI; i += 1 / 20 * Math.PI) {
    ctx.beginPath();
    ctx.strokeStyle = LINE_COLOR;
    const tmpPosStart = rotatePos(0, 26, i + Math.PI);
    const tmpPosEnd = rotatePos(0, 27 + i * 2, i + Math.PI);
    ctx.moveTo(tmpPosStart[0] + centerX, tmpPosStart[1] + centerY - 3);
    ctx.lineTo(tmpPosEnd[0] + centerX, tmpPosEnd[1] + centerY - 3);
    ctx.stroke();
  }
  ctx.resetTransform();
}

export const draw = (ctx, rotateDegree) => {
  ctx.clearRect(0, 0, 480, 100);
  circleItem(ctx, 60, 60, 37, rotateDegree);
  circleItem(ctx, 180, 60, 37, rotateDegree);
  circleItem(ctx, 310, 60, 37, rotateDegree);
  circleItem(ctx, 440, 60, 37, rotateDegree);
};
