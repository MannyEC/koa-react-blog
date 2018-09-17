import React from 'react';
import config from 'config.json';
import LargeScreen from '../components/ReleasedLargeScreen';

const container = props => (
  <LargeScreen
    {...props}
    dashboard={config}
    modules={config.modules}
  />
);

export default container;
