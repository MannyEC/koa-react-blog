import React from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import CoreLayout from 'layouts/LargeScreenLayout/CoreLayout/CoreLayout';
import EditCover from '../../components/EditCover';
import components from './index';
import bg from './bg.png';

import classes from './MainBoard.scss';

const gridLayoutProps = {
  rowHeight: 67,
  cols: 29,
  width: 1600,
  margin: [0, 0],
  containerPadding: [0, 0],
  layout: [
    {
      i: '1', x: 0, y: 0, w: 20, h: 9
    },
    {
      i: '2', x: 0, y: 9, w: 10, h: 9
    },
    {
      i: '3', x: 10, y: 9, w: 10, h: 9
    },
    {
      i: '4', x: 20, y: 0, w: 9, h: 18
    }
  ],
  isDraggable: false,
  isResizable: false
};

const MainBoard = (props) => {
  const { modules, dashboard } = props;
  const { template: { height, width } } = dashboard;
  return (
    <CoreLayout width={width} height={height} background={bg}>
      <div className={classes.container}>
        <ReactGridLayout {...gridLayoutProps} >
          {Object.keys(components).map((item, idx) => {
            const config = modules.find(mod => mod.type === item);
            const Component = config
              ? components[item]
                .find(component => component.type === config.display_type).component
              : components[item][0].component;
            return (
              <div key={`${idx + 1}`}>
                <EditCover
                  dashboard={dashboard.id}
                  layout={config ? config.id : ''}
                  mode={props.mode}
                >
                  <Component config={config} />
                </EditCover>
              </div>
            );
          })}
        </ReactGridLayout>
      </div>
    </CoreLayout>
  );
};

MainBoard.propTypes = {
  dashboard: PropTypes.object,
  modules: PropTypes.array,
  mode: PropTypes.string
};

MainBoard.defaultProps = {
  mode: 'show'
};

export default MainBoard;
