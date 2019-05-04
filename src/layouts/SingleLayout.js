import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Breadcrumb } from 'antd';
import classes from './SingleLayout.scss';

const SingleLayout = ({
  children, location, routes, params
}) => (
  <Row>
    <Row type="flex" justify="center" style={{ paddingTop: 16 }}>
      <Col span="22">
        <div className={classes.container}>
          <Row type="flex" justify="center">
            <Col span="22">
              {children}
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </Row>
);
SingleLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default SingleLayout;
