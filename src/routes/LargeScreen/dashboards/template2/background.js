const LINE_COLOR = '#00e4ff';
const HEADER_RECT_PIECE_COLOR = '#0f2531';
const CORNER_COLOR = '#06798d';

function topSection(ctx, gradient) {
  ctx.strokeStyle = LINE_COLOR;
  ctx.fillStyle = gradient;

  ctx.beginPath();

  // left top
  ctx.moveTo(572, 24);
  ctx.lineTo(32, 24);
  ctx.lineTo(32, 451);
  ctx.lineTo(113, 510);
  ctx.lineTo(812, 510);

  // // right top
  ctx.moveTo(1349, 25);
  ctx.lineTo(1888, 25);
  ctx.lineTo(1888, 453);
  ctx.lineTo(1808, 510);
  ctx.lineTo(1109, 510);
  ctx.fill();
  ctx.stroke();
}

function bottomSection(ctx, gradient) {
  ctx.strokeStyle = LINE_COLOR;
  ctx.fillStyle = gradient;

  ctx.beginPath();

  // left bottom
  ctx.moveTo(804, 542);
  ctx.lineTo(103, 542);
  ctx.lineTo(32, 592);
  ctx.lineTo(32, 1027);
  ctx.lineTo(649, 1027);
  ctx.lineTo(680, 997);

  // // right bottom
  ctx.moveTo(1113, 542);
  ctx.lineTo(1814, 542);
  ctx.lineTo(1888, 592);
  ctx.lineTo(1888, 1027);
  ctx.lineTo(1266, 1027);
  ctx.lineTo(1236, 996);
  ctx.fill();
  ctx.stroke();
}

function innerSection(ctx) {
  const topLingradTop2bottom = ctx.createLinearGradient(0, 24, 0, 510);
  topLingradTop2bottom.addColorStop(0, '#0b2937');
  topLingradTop2bottom.addColorStop(0.2, 'transparent');
  topLingradTop2bottom.addColorStop(0.8, 'transparent');
  topLingradTop2bottom.addColorStop(1, '#0b2937');

  const topLingradLeft2right = ctx.createLinearGradient(0, 0, 1888, 0);
  topLingradLeft2right.addColorStop(0, '#0b2937');
  topLingradLeft2right.addColorStop(0.1, 'transparent');
  topLingradLeft2right.addColorStop(0.9, 'transparent');
  topLingradLeft2right.addColorStop(1, '#0b2937');

  const bottomLingradTop2bottom = ctx.createLinearGradient(0, 542, 0, 1027);
  bottomLingradTop2bottom.addColorStop(0, '#0b2937');
  bottomLingradTop2bottom.addColorStop(0.2, 'transparent');
  bottomLingradTop2bottom.addColorStop(0.8, 'transparent');
  bottomLingradTop2bottom.addColorStop(1, '#0b2937');

  const bottomLingradLeft2right = ctx.createLinearGradient(0, 0, 1888, 0);
  bottomLingradLeft2right.addColorStop(0, '#0b2937');
  bottomLingradLeft2right.addColorStop(0.1, 'transparent');
  bottomLingradLeft2right.addColorStop(0.9, 'transparent');
  bottomLingradLeft2right.addColorStop(1, '#0b2937');

  topSection(ctx, topLingradTop2bottom);
  topSection(ctx, topLingradLeft2right);

  bottomSection(ctx, bottomLingradTop2bottom);
  bottomSection(ctx, bottomLingradLeft2right);

  ctx.beginPath();

  ctx.strokeStyle = LINE_COLOR;
  ctx.fillStyle = bottomLingradLeft2right;

  // left △
  ctx.moveTo(32, 470);
  ctx.lineTo(32, 565);
  ctx.lineTo(97, 522);

  // right △
  ctx.moveTo(1888, 470);
  ctx.lineTo(1888, 565);
  ctx.lineTo(1825, 522);
  ctx.fill();

  ctx.stroke();
}

/**
@params ctx canvas.getContext('2d');
@params postions array([x,y],[x,y])
*/
function headerRectPiece(ctx, postions) {
  ctx.fillStyle = HEADER_RECT_PIECE_COLOR;
  ctx.strokeStyle = LINE_COLOR;
  ctx.moveTo(postions[0][0], postions[0][1]);
  ctx.lineTo(postions[1][0], postions[1][1]);
  ctx.lineTo(postions[2][0], postions[2][1]);
  ctx.lineTo(postions[3][0], postions[3][1]);
  ctx.closePath();
  ctx.fill();
}

function headerSection(ctx) {
  ctx.beginPath();
  headerRectPiece(ctx, [[552, 0], [590, 44], [613, 44], [575, 0]]);
  headerRectPiece(ctx, [[575, 0], [621, 53], [644, 53], [597, 0]]);
  headerRectPiece(ctx, [[597, 0], [653, 64], [675, 64], [621, 0]]);
  headerRectPiece(ctx, [[621, 0], [689, 79], [1230, 79], [1300, 0]]);
  headerRectPiece(ctx, [[1321, 0], [1265, 64], [1244, 64], [1300, 0]]);
  headerRectPiece(ctx, [[1344, 0], [1297, 53], [1276, 53], [1321, 0]]);
  headerRectPiece(ctx, [[1367, 0], [1328, 44], [1306, 44], [1344, 0]]);
  ctx.stroke();
}


/**

*/
function cornerPiece(ctx, centerPos, angle) {
  ctx.beginPath();
  ctx.fillStyle = CORNER_COLOR;
  ctx.strokeStyle = CORNER_COLOR;
  ctx.moveTo(centerPos[0], centerPos[1]);

  const nodes = [
    [78, 0],
    [78, -4],
    [42, -4],
    [32, -11],
    [-11, -11], // corner
    [-11, 32],
    [-4, 42],
    [-4, 78],
    [0, 78],
  ];

  nodes.forEach((node) => {
    const afterX = node[0] * Math.cos(angle) + node[1] * Math.sin(angle) + centerPos[0];
    const afterY = -1 * node[0] * Math.sin(angle) + node[1] * Math.cos(angle) + centerPos[1];
    ctx.lineTo(afterX, afterY);
  });
  ctx.lineTo(centerPos[0], centerPos[1]);
  ctx.closePath();
  ctx.fill();
}

export const draw = (ctx) => {
  headerSection(ctx);
  innerSection(ctx);

  cornerPiece(ctx, [32, 24], 0);
  cornerPiece(ctx, [1888, 25], 270 * Math.PI / 180);
  cornerPiece(ctx, [1888, 1027], Math.PI);
  cornerPiece(ctx, [32, 1027], 90 * Math.PI / 180);
};
