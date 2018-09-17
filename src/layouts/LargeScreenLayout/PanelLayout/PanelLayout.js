import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import topLeftCorner from './assets/corner-top-left.png';
import bottomLeftCorner from './assets/corner-bottom-left.png';
import topRightCorner from './assets/corner-top-right.png';
import bottomRightCorner from './assets/corner-bottom-right.png';

import classes from './PanelLayout.scss';

export const PanelLayout = ({ children, withOutSize, size }) => (
  <div className={classes.container}>
    <img className={classes.topLeftCorner} src={topLeftCorner} />
    <img className={classes.topRightCorner} src={topRightCorner} />
    <img className={classes.bottomLeftCorner} src={bottomLeftCorner} />
    <img className={classes.bottomRightCorner} src={bottomRightCorner} />
    {!withOutSize && React.Children.map(children, child => (
      React.cloneElement(child, { size })
    ))}
    {withOutSize && children}
  </div>
);

PanelLayout.propTypes = {
  children: PropTypes.element
};

export default sizeMe({ monitorHeight: true })(PanelLayout);
