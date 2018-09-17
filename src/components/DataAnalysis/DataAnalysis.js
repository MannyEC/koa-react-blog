import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import classNames from 'classnames';
import classes from './DataAnalysis.scss';


const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const getBezier = (ps, pe, pc, t) => (1 - t) ** 2 * ps + 2 * (1 - t) * t * pc + t ** 2 * pe;

const getCirclePoint = (x, y, r, deg) => ({
  x: r * Math.cos(deg) + x,
  y: r * Math.sin(deg) + y
});

const getControlPoint = (ps, deg, r1, r2) => ({
  x: (r2 - r1) / 2 / Math.cos(deg) + ps.x,
  y: ps.y
});

const drawCircleDot = (ctx, x, y, cr, dr, deg) => {
  ctx.save();
  let pointsAngle = 0;
  while (pointsAngle < Math.PI * 2) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(pointsAngle);
    ctx.beginPath();
    ctx.arc(0, cr, dr, 0, 2 * Math.PI, false);
    ctx.restore();
    ctx.fill();
    pointsAngle += deg;
  }
  ctx.restore();
};

const drawPieDot = (ctx, x, y, width, height, dr) => {
  for (let tempX = x - width / 2; tempX <= x + width / 2;) {
    for (let tempY = y - height / 2; tempY <= y + height / 2;) {
      ctx.beginPath();
      ctx.arc(tempX, tempY, dr, 0, 2 * Math.PI, false);
      ctx.fill();
      tempY += 6 * dr;
    }
    tempX += 6 * dr;
  }
};

const drawBezier = (ctx, height, width, r1, r2, deg, idx) => {
  const transform = {
    0: 4,
    1: 2,
    2: 3,
    3: 1,
    4: 0,
    5: 6,
    6: 5
  };
  const rate = 3;
  const time = new Date();
  const offset = idx % 2 === 1 ? -Math.PI * ((transform[idx] + 1) / 15) : Math.PI * (transform[idx] / 15);
  const cur = ((2 * Math.PI) / rate) * time.getSeconds() + ((2 * Math.PI) / 1000 / rate) * time.getMilliseconds() + offset;
  const t = Math.floor(cur / Math.PI * 2) % 2 !== 0 ? 0 : Math.abs(Math.sin(cur));
  const startPoint = getCirclePoint(width / 2, height / 2, r1, deg);
  const controlPoint = getControlPoint(startPoint, deg, r1, r2);
  const endPoint = getCirclePoint(width / 2, height / 2, r2, deg);
  const bezierPoint = {
    x: getBezier(startPoint.x, endPoint.x, controlPoint.x, t),
    y: getBezier(startPoint.y, endPoint.y, controlPoint.y, t)
  };
  ctx.save();
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
  ctx.stroke();
  if (t !== 0) {
    ctx.beginPath();
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#fff';
    ctx.arc(bezierPoint.x, bezierPoint.y, 5, 0, 2 * Math.PI, false);
    ctx.fill();
  }
  ctx.restore();
};

const drawStatic = (ctx, height, width, title) => {
  const radius1 = height * 0.5 / 2;
  const radius2 = radius1 * 2 / 3;
  // 画圈圈
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.shadowColor = '#fff';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, radius1 + 8, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,.45)';
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, radius2 + 8, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, radius1 - height / 8, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,.45)';
  drawCircleDot(ctx, width / 2, height / 2, radius1 - height / 8 + 8, 2, Math.PI / 9);
  ctx.restore();

  ctx.save();
  const lingrad = ctx.createLinearGradient(width / 2 - (radius1 - height / 8), 0, width / 2 + (radius1 - height / 8), 0);
  lingrad.addColorStop(0, 'rgba(255,255,255,0)');
  lingrad.addColorStop(0.25, 'rgba(255,255,255,0)');
  lingrad.addColorStop(0.5, 'rgba(255,255,255,.95)');
  lingrad.addColorStop(0.75, 'rgba(255,255,255,0)');
  lingrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = lingrad;
  drawCircleDot(ctx, width / 2, height / 2, radius2 + 16, 2, Math.PI / 36);
  ctx.restore();
  ctx.save();
  const radgrad = ctx.createRadialGradient(width / 2, height / 2, radius1 - height / 8, width / 2, height / 2 - height / 32, 1);
  radgrad.addColorStop(0, 'rgba(255,255,255,0)');
  radgrad.addColorStop(1, 'rgba(255,255,255,.95)');
  ctx.fillStyle = radgrad;
  drawPieDot(ctx, width / 2, height / 2 - height / 16, radius1, (radius1 - height / 8) / 3, 2);
  drawPieDot(ctx, width / 2, height / 2 + height / 16, radius1, (radius1 - height / 8) / 3, 2);
  ctx.restore();

  // 写字
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,.85)';
  ctx.font = '20px SourceHanSansCN-Regular';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, width / 2, height / 2);
  ctx.restore();

  // 画三角
  ctx.save();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(width / 2 - radius1, height / 2 + 14);
  ctx.lineTo(width / 2 - radius1, height / 2 - 14);
  ctx.lineTo(width / 2 - radius1 + 14, height / 2);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(width / 2 + radius1, height / 2 + 14);
  ctx.lineTo(width / 2 + radius1, height / 2 - 14);
  ctx.lineTo(width / 2 + radius1 - 14, height / 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

const drawSpin = (ctx, height, width) => {
  const radius1 = height * 0.5 / 2;
  const radius2 = radius1 * 2 / 3;
  const time = new Date();
  const head = ((2 * Math.PI) / 2) * time.getSeconds() + ((2 * Math.PI) / 2000) * time.getMilliseconds();
  // 环形扫描
  ctx.save();
  ctx.strokeStyle = 'rgba(247,93,49,.4)';
  ctx.fillStyle = 'rgba(255,255,255,.1)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(247,93,49,.4)';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, radius2, head, head + Math.PI / 2, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, radius2, head - Math.PI, head - Math.PI / 2, false);
  ctx.stroke();
  ctx.restore();
  // 扇形扫描
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,.1)';
  ctx.lineWidth = height / 8;
  ctx.beginPath();
  // ctx.moveTo(width / 2, height / 2);
  ctx.arc(width / 2, height / 2, radius1 - height / 16, -head, -head - Math.PI / 2, true);
  ctx.stroke();
  ctx.beginPath();
  // ctx.moveTo(width / 2, height / 2);
  ctx.arc(width / 2, height / 2, radius1 - height / 16, Math.PI - head, Math.PI / 2 - head, true);
  ctx.stroke();
  ctx.restore();
};

const drawRightText = (ctx, width, height, radius, deg, text) => {
  const areaPoint1 = getCirclePoint(width / 2, height / 2, radius, deg + Math.PI / 180 * 5);
  const areaPoint2 = getCirclePoint(width / 2, height / 2, radius, deg - Math.PI / 180 * 5);
  const areaPoint3 = {
    x: width - 30,
    y: areaPoint2.y
  };
  const areaPoint4 = {
    x: width - 30,
    y: areaPoint1.y
  };
  ctx.save();
  const lingrad = ctx.createLinearGradient((areaPoint1.x + areaPoint2.x) / 2, height / 2, width - 30, height / 2);
  lingrad.addColorStop(0, 'rgba(255,255,255,.25)');
  lingrad.addColorStop(0.3, 'rgba(255,255,255,.1)');
  lingrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = lingrad;
  ctx.beginPath();
  // ctx.moveTo(areaPoint1.x, areaPoint1.y);
  ctx.arc(width / 2, height / 2, radius, deg + Math.PI / 180 * 5, deg - Math.PI / 180 * 5, true);
  ctx.lineTo(areaPoint3.x, areaPoint3.y);
  ctx.lineTo(areaPoint4.x, areaPoint4.y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.font = '30px DS-Digital';
  ctx.fillStyle = '#35e5ff';
  ctx.textAlign = 'start';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.count, (areaPoint1.x + areaPoint2.x) / 2 + 25, (areaPoint1.y + areaPoint2.y) / 2);
  ctx.restore();
  ctx.save();
  ctx.font = '22px SourceHanSansCN-Regular';
  ctx.fillStyle = 'rgba(255,255,255,.8)';
  ctx.textAlign = 'end';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.name, areaPoint3.x - 20, (areaPoint3.y + areaPoint4.y) / 2);
  ctx.restore();
};

const drawRight = (ctx, width, height, config) => {
  let maxDeg = 0;
  const x = width / 2;
  const y = height / 2;
  const radius = height / 2;
  config.forEach((item, idx) => {
    const deg = idx % 2 === 0 ? idx * Math.PI / 180 * 6 : -(idx + 1) * Math.PI / 180 * 6;
    if (Math.abs(deg) > maxDeg) {
      maxDeg = Math.abs(deg);
    }
    drawRightText(ctx, width, height, radius, deg, item);
    drawBezier(ctx, height, width, height * 0.5 / 2 + 8, radius, deg, idx);
  });
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineWidth = 6;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 20;
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x, y, radius, maxDeg + Math.PI / 45, -maxDeg - Math.PI / 45, true);
  ctx.stroke();
  ctx.restore();
};

const drawLeft = (ctx, width, height, config) => {
  // const maxDeg = config.length % 2 === 1
  //   ? (config.length + 1) * Math.PI / 36
  //   : (config.length + 2) * Math.PI / 36;
  const maxDeg = 45 * Math.PI / 180;
  // 计算左边的红月亮
  const leftRadius = height * 0.8 / 2;
  const topLeftPoint = getCirclePoint(0, height / 2, leftRadius, -maxDeg);
  const bottomLeftPoint = getCirclePoint(0, height / 2, leftRadius, maxDeg);
  // 定义新角的对边长度
  const temp1 = Math.abs(topLeftPoint.y - bottomLeftPoint.y) / 2;
  // 定义新角的邻边长度
  const temp2 = topLeftPoint.x + 15;
  // 定义新半径
  const temp3 = Math.sqrt(temp1 ** 2 + temp2 ** 2);
  const maxDeg2 = Math.atan(temp1 / temp2);

  // 计算另一个红月亮
  const rightRadius = height * 0.5 / 2 + 30;
  const rightMaxDeg = Math.PI / 6;
  const topRightPoint = getCirclePoint(width / 2, height / 2, rightRadius, Math.PI + rightMaxDeg);
  const bottomRightPoint = getCirclePoint(width / 2, height / 2, rightRadius, Math.PI - rightMaxDeg);
  // 定义新角的对边长度
  const rightTemp1 = Math.abs(topRightPoint.y - bottomRightPoint.y) / 2;
  // 定义新角的邻边长度
  const rightTemp2 = Math.abs(topRightPoint.x + 25 - width / 2);
  // 定义新半径
  const rightTemp3 = Math.sqrt(rightTemp1 ** 2 + rightTemp2 ** 2);
  const rightMaxDeg2 = Math.atan(rightTemp1 / rightTemp2);

  // 计算左边到右边填充
  const bezierPoint1 = getCirclePoint(width / 2, height / 2, rightRadius, Math.PI * 10 / 9);
  const bezierPoint2 = getCirclePoint(width / 2, height / 2, rightRadius, Math.PI * 8 / 9);
  const ctrlPoint1 = {
    x: bezierPoint1.x - 50,
    y: height / 2 + 55
  };
  const ctrlPoint2 = {
    x: bezierPoint1.x - 50,
    y: height / 2 - 55
  };

  // 画左边大圆到小圆的填充
  ctx.save();
  const lingrad = ctx.createLinearGradient(bezierPoint1.x, height / 2, topLeftPoint.x, height / 2);
  lingrad.addColorStop(0, '#ee5959');
  lingrad.addColorStop(0.4, '#ee5959');
  lingrad.addColorStop(1, 'rgba(238,89,89,.05)');
  ctx.fillStyle = lingrad;
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, rightRadius, Math.PI * 8 / 9, Math.PI * 10 / 9, false);
  ctx.quadraticCurveTo(ctrlPoint1.x, ctrlPoint1.y, topLeftPoint.x, topLeftPoint.y);
  ctx.arc(0, height / 2, leftRadius, -maxDeg, maxDeg, false);
  ctx.quadraticCurveTo(ctrlPoint2.x, ctrlPoint2.y, bezierPoint2.x, bezierPoint2.y);
  ctx.fill();
  ctx.restore();

  // 画左边的红月亮
  ctx.save();
  ctx.fillStyle = '#fe6868';
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.arc(0, height / 2, leftRadius, maxDeg, -maxDeg, true);
  ctx.arc(-15, height / 2, temp3, -maxDeg2, maxDeg2, false);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 画另一个红月亮
  ctx.save();
  ctx.fillStyle = '#fe6868';
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, rightRadius, Math.PI - rightMaxDeg, rightMaxDeg + Math.PI, false);
  ctx.arc(width / 2 - 25, height / 2, rightTemp3, Math.PI + rightMaxDeg2, Math.PI - rightMaxDeg2, true);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 画左边圆的阴影
  ctx.save();
  const lingrad2 = ctx.createLinearGradient(leftRadius, height / 2, leftRadius - 70, height / 2);
  lingrad2.addColorStop(0, 'rgba(238,89,89,.5)');
  lingrad2.addColorStop(0.5, 'rgba(238,89,89,.2)');
  lingrad2.addColorStop(1, 'rgba(238,89,89,0)');
  ctx.fillStyle = lingrad2;
  ctx.beginPath();
  ctx.arc(0, height / 2, leftRadius, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 写字
  ctx.save();
  ctx.font = '16px SourceHanSansCN-Regular';
  ctx.fillStyle = 'rgba(255,255,255,.6)';
  ctx.textAlign = 'end';
  ctx.textBaseline = 'middle';
  config.forEach((item, idx) => {
    const deg = idx % 2 === 0 ? idx * Math.PI / 30 : -(idx + 1) * Math.PI / 30;
    const textPoint = getCirclePoint(0, height / 2, leftRadius - 45, deg);
    ctx.fillText(item, textPoint.x, textPoint.y);
  });
  ctx.restore();
};

class DataAnalysis extends Component {
  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext('2d');
    if (this.repeat) {
      window.cancelAnimationFrame(this.repeat);
    }
    this.draw();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.size, nextProps.size) ||
    !isEqual(this.props.config, nextProps.config)) {
      if (this.repeat) {
        window.cancelAnimationFrame(this.repeat);
      }
      this.draw(nextProps);
    }
  }

  draw = (props) => {
    const { size: { height, width }, config: { left, center, right } } = props || this.props;
    const { ctx } = this;
    const drawThis = this;
    const repeatOfen = () => {
      ctx.clearRect(0, 0, width, height);
      drawStatic(ctx, height, width, center);
      drawSpin(ctx, height, width);
      drawRight(ctx, width, height, right);
      drawLeft(ctx, width, height, left);
      drawThis.repeat = window.requestAnimationFrame(repeatOfen);
    };
    repeatOfen();
  }

  canvasRef = React.createRef();

  render() {
    const {
      size,
      className
    } = this.props;
    return (
      <div
        className={classNames({
          [classes.container]: true,
          [className]: className !== ''
        })}
        style={{
          height: `${size.height}px`,
          width: `${size.width}px`
        }}
      >
        <canvas
          className={classes.canvas}
          ref={this.canvasRef}
          height={size.height}
          width={size.width}
        />
      </div>
    );
  }
}

DataAnalysis.propTypes = {
  size: PropTypes.object,
  className: PropTypes.string,
  config: PropTypes.object
};

DataAnalysis.defaultProps = {
  size: {
    height: 520,
    width: 1060
  },
  className: '',
  config: {
    left: [
      'xxxxx1',
    ],
    center: '大数据分析',
    right: [{
      name: 'xxxx1',
      count: 10
    }]
  }
};

export default DataAnalysis;
