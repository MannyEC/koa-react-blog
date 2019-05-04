import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import background from './assets/bg4gd.png';
import classes from './CoreLayout.scss';


const scaleStyle = (props) => {
  const scale = Math.min(
    props.size.width / props.width,
    props.size.height / props.height
  );
  sessionStorage.setItem('scale', scale);
  return {
    transform: `translate(-50%, -50%) scale(${scale})`,
    height: props.height,
    width: props.width
  };
};

export const CoreLayout = (props) => {
  const backgroundStyle = {
    backgroundImage: `url(${props.background || background})`
  };
  return (
    <div style={backgroundStyle} className={classes.container}>
      <div className={classes.core} style={scaleStyle(props)}>
        {React.Children.map(props.children, child => (
          React.cloneElement(child, {
            scale: Math.min(
              props.size.width / props.width,
              props.size.height / props.height
            )
          })
        ))}
      </div>
    </div>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  background: PropTypes.string,
  size: PropTypes.object
};

CoreLayout.defaultProps = {
  height: 1080,
  width: 1920
};

export default sizeMe({ monitorHeight: true })(CoreLayout);
