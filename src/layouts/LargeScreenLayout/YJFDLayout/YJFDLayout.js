import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import classes from './YJFDLayout.scss'; 

export const YJFDLayout = ({ children, withOutSize, size }) => { 
  return (
    <div className={classes.container}>
    {!withOutSize && React.Children.map(children, child => (
      React.cloneElement(child, { size })
    ))}
    {withOutSize && children}
  </div>
  );
};

YJFDLayout.propTypes = {
   children: PropTypes.element
};

export default sizeMe({ monitorHeight: true })(YJFDLayout);
