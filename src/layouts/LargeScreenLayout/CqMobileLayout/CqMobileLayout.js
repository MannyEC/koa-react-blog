import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import classes from './CqMobileLayout.scss';
import CoreLayout from '../CoreLayout';
import bg from './assets/bg.png';

export const CqMobileLayout = (props) => {
  return (
    <CoreLayout width={props.width} height={props.height} background={bg}>
      <div className={classes .container}>
        <div className={classes.header}>{props.title}</div>
        <div className={classes.content}>
          <div className={classes.conBody}>
            {props.children}
          </div>
        </div>
      </div>        
    </CoreLayout>
  );
};

CqMobileLayout.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  title: PropTypes.string
};

CqMobileLayout.defaultProps = {
  title: '重庆移动模板',
  height: 1024,
  width: 1280
};

export default sizeMe({ monitorHeight: true })(CqMobileLayout);
