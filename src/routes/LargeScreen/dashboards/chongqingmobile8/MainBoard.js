import React from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import classNames from 'classnames';
import CqMobileLayout from 'layouts/LargeScreenLayout/CqMobileLayout/CqMobileLayout';
import EditCover from '../../components/EditCover';
import components from './index';

import classes from './MainBoard.scss';

const getLeftItemClass = idx => classNames({
  [classes.unit]: idx === 1,
  [classes.unit2]: idx === 2
});

const MainBoard = (props) => {
  const { modules, dashboard } = props;
  const { template: { height, width } } = dashboard;
  return (
    <CqMobileLayout title={'DNS业务场景态势'} width={width} height={height}>
      <div className={classes.container}>
        <div className = {classes.leftItems}>
          <div className = {classes.leftBg}>
            {
              Object.keys(components).map((item, idx) => {
                const config = modules.find(mod => mod.type === item);
                const Component = config
                  ? components[item]
                    .find(component => component.type === config.display_type).component
                  : components[item][0].component;              
                if (idx < 2)  {
                  return (
                    <div className={getLeftItemClass(idx+1)} key={`${idx + 1}`}>
                      <div style={{ height: '100%', width: '100%' }}>
                        <EditCover
                          dashboard={dashboard.id}
                          layout={config ? config.id : ''}
                          mode={props.mode}
                        >
                          <Component config={config} />
                        </EditCover>
                      </div>
                    </div>             
                    
                  );
                }
              }
            )}
          </div>
        </div>
        <div className = {classes.rightItems}>
          <div className = {classes.rightBg}>
            {
              Object.keys(components).map((item, idx) => {
                const config = modules.find(mod => mod.type === item);
                const Component = config
                  ? components[item]
                    .find(component => component.type === config.display_type).component
                  : components[item][0].component;              
                if (idx >= 2)  {
                  return (
                    <div className = {classes.rightItem} key={`${idx + 10}`}>
                      <div style={{ height: '100%', width: '100%' }}>
                        <EditCover
                          dashboard={dashboard.id}
                          layout={config ? config.id : ''}
                          mode={props.mode}
                        >
                          <Component config={config} />
                        </EditCover>
                      </div>
                    </div>             
                    
                  );
                }
              })
            }
          </div>
        </div>
          
      </div>
    </CqMobileLayout>
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
