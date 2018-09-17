import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import classNames from 'classnames';
import classes from './Progress.scss';

const propTypes = {
  size: PropTypes.number.isRequired,
  circleStyle: PropTypes.shape({
    width: PropTypes.number,
    background: PropTypes.string,
    color: PropTypes.string
  }),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string
  ]),
  className: PropTypes.string,
  percent: PropTypes.number,
  loading: PropTypes.bool
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};


class Progress extends Component {
  componentDidMount() {
    const {
      size,
      percent,
      loading,
      circleStyle
    } = this.props;
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext('2d');
    if (this.requestPercent) {
      window.cancelAnimationFrame(this.requestPercent);
    }
    if (this.requestLoading) {
      window.cancelAnimationFrame(this.requestLoading);
    }
    if (loading) {
      this.drawLoadingCircle(this.ctx, size, circleStyle);
    } else {
      this.drawPercentCircle(this.ctx, size, circleStyle, 0, percent);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.size !== nextProps.size ||
      this.props.percent !== nextProps.percent ||
      this.props.loading !== nextProps.loading ||
      isEqual(this.props.circleStyle, nextProps.circleStyle)
    ) {
      const {
        size,
        percent,
        loading,
        circleStyle
      } = nextProps;
      if (this.requestPercent) {
        window.cancelAnimationFrame(this.requestPercent);
      }
      if (this.requestLoading) {
        window.cancelAnimationFrame(this.requestLoading);
      }
      if (loading) {
        this.drawLoadingCircle(this.ctx, size, circleStyle);
      } else if (this.props.percent !== percent) {
        this.drawPercentCircle(this.ctx, size, circleStyle, this.props.percent, percent);
      }
    }
  }

  drawLoadingCircle = (ctx, size, circleStyle) => {
    const color = hexToRgb(circleStyle.color.toLowerCase());
    const time = new Date();
    let head = ((2 * Math.PI) / 4) * time.getSeconds() + ((2 * Math.PI) / 4000) * time.getMilliseconds();
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = circleStyle.background;
    ctx.lineWidth = circleStyle.width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - circleStyle.width, 0, 2 * Math.PI, false);
    ctx.stroke();
    for (let i = 0; i < 50;) {
      const tail = head - Math.PI / 2 / 50;
      ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${1 - i / 50})`;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - circleStyle.width, tail, head, false);
      ctx.stroke();
      head = tail;
      i += 1;
    }
    this.requestLoading = window.requestAnimationFrame(() =>
      this.drawLoadingCircle(ctx, size, circleStyle));
  };

  drawPercentCircle = (ctx, size, circleStyle, oldPercent, newPercent) => {
    let oldAngle = 2 * Math.PI / 100 * oldPercent - Math.PI / 2;
    const newAngle = 2 * Math.PI / 100 * newPercent - Math.PI / 2;
    const drawCircle = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.strokeStyle = circleStyle.background;
      ctx.lineWidth = circleStyle.width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - circleStyle.width, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.strokeStyle = circleStyle.color;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - circleStyle.width, -Math.PI / 2, oldAngle, false);
      ctx.stroke();
      if (oldAngle < newAngle) {
        oldAngle += 2 * Math.PI / 100;
        this.requestPercentChild = window.requestAnimationFrame(drawCircle);
      } else {
        window.cancelAnimationFrame(this.requestPercentChild);
      }
    };
    drawCircle();
  };

  canvasRef = React.createRef();

  render() {
    const {
      size,
      className,
      children,
      circleStyle
    } = this.props;
    return (
      <div
        className={classNames({
          [classes.container]: true,
          [className]: className !== ''
        })}
        style={{
          height: `${size}px`,
          width: `${size}px`
        }}
      >
        <canvas
          className={classes.canvas}
          ref={this.canvasRef}
          height={size}
          width={size}
        />
        <div
          className={classes.children}
          style={{
            top: `${circleStyle.width * 2}px`,
            left: `${circleStyle.width * 2}px`,
            width: `calc(100% - ${circleStyle.width * 4}px)`,
            height: `calc(100% - ${circleStyle.width * 4}px)`,
            borderRadius: '50%',
          }}
        >
          { children }
        </div>
      </div>
    );
  }
}

Progress.propTypes = propTypes;

Progress.defaultProps = {
  className: '',
  percent: 0,
  loading: false,
  circleStyle: {
    width: 4,
    background: '#333',
    color: '#68b92e'
  }
};

export default Progress;
