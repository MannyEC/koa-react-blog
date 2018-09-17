import React from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import CoreLayout from 'layouts/LargeScreenLayout/CoreLayout/CoreLayout';
import EditCover from '../../components/EditCover';
import components from './index';
import bg from './images/bg.png';

import classes from './MainBoard.scss';

const gridLayoutProps = {
  rowHeight: 47,
  cols: 8,
  width: 1920,
  margin: [20, 10],
  containerPadding: [20, 10],
  layout: [
    {
      i: '1', x: 0, y: 0, w: 2, h: 2.5
    },
    {
      i: '2', x: 2, y: 0, w: 6, h: 13
    },
    {
      i: '3', x: 0, y: 2, w: 2, h: 6
    },
    {
      i: '4', x: 0, y: 8, w: 2, h: 11.5
    },
    {
      i: '5', x: 2, y: 12, w: 3, h: 7
    },
    {
      i: '6', x: 5, y: 12, w: 3, h: 7
    },
    
  ],
  isDraggable: false,
  isResizable: false
};

const MainBoard = (props) => {
  const { modules, dashboard } = props;
  const { template: { height, width } } = dashboard;
  return (
    <CoreLayout width={width} height={height} background={bg}>
    <div className={classes.topline}></div>
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
