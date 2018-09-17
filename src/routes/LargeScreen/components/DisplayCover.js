import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import classes from './DisplayCover.scss';


const scaleStyle = (props) => {
  return {
    transform: `translate(-50%, -50%) scale(${sessionStorage.scale ? sessionStorage.scale : 1})`
  };
};

export const DisplayCover = (props) => {
  return (
    <div className={classes.container}>
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

DisplayCover.propTypes = {
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
  size: PropTypes.object
};

DisplayCover.defaultProps = {
  height: 700,
  width: 700
};

export default sizeMe({ monitorHeight: true })(DisplayCover);
