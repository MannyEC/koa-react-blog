import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import CoreLayout from 'layouts/LargeScreenLayout/CoreLayout/CoreLayout';

import dashboards from '../dashboards';

import classes from './LargeScreen.scss';

const { Content } = Layout;

const getDashboard = (dashboard) => {
  const dashboardKeys = Object.keys(dashboards);
  if (dashboardKeys.includes(dashboard)) {
    return dashboards[dashboard].MainBoard;
  }
  return null;
};

const ReleasedLargeScreen = (props) => {
  const {
    modules,
    dashboard
  } = props;

  const Dashborad = getDashboard(dashboard.template ? dashboard.template.name : '');
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Content>
        <div
          style={{
            height: '100vh',
            position: 'relative',
            top: '0'
          }}
        >
          {Dashborad && <Dashborad
            dashboard={dashboard}
            modules={modules}
            mode="show"
          />}
        </div>
      </Content>
    </Layout>
  );
};

ReleasedLargeScreen.propTypes = {
  dashboard: PropTypes.object,
  modules: PropTypes.array
};

export default ReleasedLargeScreen;
