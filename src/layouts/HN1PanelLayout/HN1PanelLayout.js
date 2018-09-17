import React, { Component } from 'react';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import classes from './HN1PanelLayout.scss';

const getRealSize = (size) => {
  const scale = size.height.toString().split('.').length > 0 &&
  size.width.toString().split('.').length > 0 &&
  sessionStorage.scale
    ? sessionStorage.scale
    : 1;
  return {
    height: Math.round(size.height / scale),
    width: Math.round(size.width / scale)
  };
};

const draw = (ctx, title, size) => {
  ctx.clearRect(0, 0, size.width, size.height);
  const padding = 5;
  const basicSize = 32;
  const topLeftBoder = 24;
  const radius = 8;
  const titleSize = (title.length + 2) * basicSize;
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, .05)';
  ctx.fillRect(padding, basicSize, size.width - padding * 2, size.height - padding - basicSize);
  ctx.restore();
  ctx.beginPath();
  ctx.moveTo(topLeftBoder, basicSize);
  ctx.lineTo(padding, basicSize);
  ctx.lineTo(padding, size.height - padding);
  ctx.lineTo(size.width - padding, size.height - padding);
  ctx.lineTo(size.width - padding, basicSize);
  ctx.lineTo(topLeftBoder + titleSize, basicSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(topLeftBoder + radius, basicSize, radius, -Math.PI / 2, Math.PI / 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(topLeftBoder + titleSize - radius, basicSize, radius, -Math.PI / 2, Math.PI / 2, false);
  ctx.closePath();
  ctx.fill();
  ctx.fillText(title, topLeftBoder + basicSize, basicSize * 1.35);
};


class HN1PanelLayout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    title: PropTypes.string,
    withOutSize: PropTypes.bool,
    size: PropTypes.object
  }

  componentDidMount() {
    const { title, size } = this.props;
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext('2d');
    this.ctx.strokeStyle = '#bbe5ff';
    this.ctx.fillStyle = '#bbe5ff';
    this.ctx.shadowColor = '#bbe5ff';
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 10;
    this.ctx.font = '32px SourceHanSansCN-Regula';
    draw(this.ctx, title, getRealSize(size));
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.size, nextProps.size) || this.props.title !== nextProps.title) {
      const { title, size } = nextProps;
      draw(this.ctx, title, getRealSize(size));
    }
  }

  canvasRef = React.createRef();

  render() {
    const {
      children,
      withOutSize,
      size
    } = this.props;
    return (
      <div className={classes.container} ref={this.containerRef}>
        <canvas
          className={classes.canvas}
          ref={this.canvasRef}
          height={1200}
          width={1600}
        />
        <div className={classes.content}>
          {!withOutSize && React.Children.map(children, child => (
            React.cloneElement(child, { size })
          ))}
          {withOutSize && children}
        </div>
      </div>
    );
  }
}

export default sizeMe({ monitorHeight: true })(HN1PanelLayout);
