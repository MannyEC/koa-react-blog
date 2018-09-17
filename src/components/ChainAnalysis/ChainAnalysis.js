import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import classNames from 'classnames';
import classes from './ChainAnalysis.scss';


const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const drawProgress = (ctx, width, nodeIdx, dataLength) => {
  ctx.save();
  ctx.translate(width / 2 - 2, width / 7.5 + 8);
  [...(new Array(6))].forEach((val, idx) => {
    const time = new Date();
    const seconds = Date.parse(time) / 1000 % dataLength;
    const milliseconds = time.getMilliseconds();
    ctx.save();
    if (nodeIdx < seconds || (nodeIdx === seconds && milliseconds >= 1000 / dataLength * idx)) {
      ctx.fillStyle = '#35e5ff';
      ctx.shadowColor = '#35e5ff';
      ctx.shadowBlur = 40;
    } else {
      ctx.fillStyle = '#313131';
    }
    ctx.fillRect(0, 0, 4, 10);
    ctx.restore();
    ctx.translate(0, 14);
  });
  ctx.restore();
};

const drawChainNode = (ctx, width, height, config, data, nodeIdx) => {
  if (nodeIdx < data.length - 1) {
    drawProgress(ctx, width, nodeIdx, data.length - 1);
  }
  const nodeData = data[nodeIdx];
  const point1 = { x: width / 3, y: 0 };
  const point2 = { x: width / 6, y: width / 7.5 };
  const point3 = { x: width / 6 * 5, y: width / 7.5 };
  const point4 = { x: width / 3 * 2, y: 0 };
  ctx.save();
  const lingrad1 = ctx.createLinearGradient(0, 0, 0, point2.y);
  const lingrad2 = ctx.createLinearGradient(0, 0, 0, point2.y);
  const lingrad3 = ctx.createLinearGradient(point2.x, point2.y, point3.x, point3.y);
  const lingrad4 = ctx.createLinearGradient(point1.x, point1.y, point4.x, point4.y);
  let nodeColor = hexToRgb(config.normal.color);
  let changeOffset = 0;
  if (nodeData.count >= config.warning.min) {
    nodeColor = hexToRgb(config.warning.color);
    if (nodeData.count >= config.error.min) {
      nodeColor = hexToRgb(config.error.color);
    }
    const rate = 2;
    const time = new Date();
    const cur = ((2 * Math.PI) / rate) * time.getSeconds() + ((2 * Math.PI) / 1000 / rate) * time.getMilliseconds();
    changeOffset = Math.sin(cur) / 10;
    lingrad1.addColorStop(0, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},.03)`);
    lingrad1.addColorStop(1, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},${0.3 + changeOffset})`);
    lingrad2.addColorStop(0, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},.15)`);
    lingrad2.addColorStop(1, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},${0.55 + changeOffset / 2})`);
    lingrad3.addColorStop(0, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},${0.55 + changeOffset / 2})`);
    lingrad3.addColorStop(0.5, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},${0.95 + changeOffset / 2})`);
    lingrad3.addColorStop(1, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},${0.55 + changeOffset / 2})`);
    lingrad4.addColorStop(0, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},0)`);
    lingrad4.addColorStop(0.5, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},${0.65 + changeOffset / 2})`);
    lingrad4.addColorStop(1, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},0)`);
  } else {
    lingrad1.addColorStop(0, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},.03)`);
    lingrad1.addColorStop(1, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},.3)`);
    lingrad2.addColorStop(0, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},.15)`);
    lingrad2.addColorStop(1, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},.55`);
    lingrad3.addColorStop(0, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},.55)`);
    lingrad3.addColorStop(0.5, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},1)`);
    lingrad3.addColorStop(1, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},.55)`);
    lingrad4.addColorStop(0, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},0)`);
    lingrad4.addColorStop(0.5, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},.65)`);
    lingrad4.addColorStop(1, `rgba(${nodeColor.r},${nodeColor.g},${nodeColor.b},0)`);
  }

  ctx.save();
  ctx.fillStyle = lingrad1;
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.lineTo(point3.x, point3.y);
  ctx.lineTo(point4.x, point4.y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = lingrad2;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(point4.x, point4.y);
  ctx.lineTo(point3.x, point3.y);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = lingrad3;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(point2.x, point2.y);
  ctx.lineTo(point3.x, point3.y);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = lingrad4;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  if (nodeIdx < data.length - 1) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point2.y + 8);
    ctx.lineTo(width / 2 - 15, point2.y + 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width / 2 + 15, point2.y + 8);
    ctx.lineTo(point4.x, point2.y + 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width / 2 - 40, point2.y + 16);
    ctx.lineTo(width / 2 - 15, point2.y + 16);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width / 2 + 15, point2.y + 16);
    ctx.lineTo(width / 2 + 40, point2.y + 16);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(point1.x, point2.y + 8);
    ctx.lineTo(point4.x, point2.y + 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width / 2 - 8, point2.y + 16);
    ctx.lineTo(width / 2 + 8, point2.y + 16);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.font = '28px SourceHanSansCN-Regular';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'start';
  ctx.textBaseline = 'middle';
  ctx.fillText(nodeData.name, (point1.x + point2.x) / 2 - 15, point1.y);
  ctx.restore();

  ctx.save();
  ctx.font = '50px DS-Digital';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'end';
  ctx.textBaseline = 'middle';
  ctx.fillText(nodeData.count, (point3.x + point4.x) / 2, point4.y);
  ctx.restore();

  ctx.restore();
};

const drawChain = (ctx, width, height, config, data) => {
  ctx.save();
  ctx.translate(0, width * 118 / 450);
  data.forEach((item, idx) => {
    drawChainNode(ctx, width, height, config, data, idx);
    ctx.translate(0, width / 7.5 + 84);
  });
  ctx.restore();
};


class ChainAnalysis extends Component {
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
    !isEqual(this.props.config, nextProps.config) ||
    !isEqual(this.props.data, nextProps.data)) {
      if (this.repeat) {
        window.cancelAnimationFrame(this.repeat);
      }
      this.draw(nextProps);
    }
  }

  draw = (props) => {
    const { size: { height, width }, config, data } = props || this.props;
    const { ctx } = this;
    const drawThis = this;
    const repeatOfen = () => {
      ctx.clearRect(0, 0, width, height);
      drawChain(ctx, width, height, config, data);
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

ChainAnalysis.propTypes = {
  size: PropTypes.object,
  className: PropTypes.string,
  config: PropTypes.object,
  data: PropTypes.array
};

ChainAnalysis.defaultProps = {
  size: {
    height: 1200,
    width: 470
  },
  className: '',
  config: {
    normal: {
      min: 0,
      max: 0,
      color: '#ffffff'
    },
    warning: {
      min: 1,
      max: 10,
      color: '#feea68'
    },
    error: {
      min: 11,
      max: 99999,
      color: '#ee5959'
    }
  },
  data: [{
    name: 'xxxx1',
    count: 0
  }, {
    name: 'xxxx2',
    count: 0
  }, {
    name: 'xxxx3',
    count: 0
  }, {
    name: 'xxxx4',
    count: 1
  }, {
    name: 'xxxx5',
    count: 1
  }, {
    name: 'xxxx6',
    count: 111
  }, {
    name: 'xxxx7',
    count: 0
  }]
};

export default ChainAnalysis;
