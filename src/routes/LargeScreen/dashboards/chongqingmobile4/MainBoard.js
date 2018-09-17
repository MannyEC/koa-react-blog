import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import CoreLayout from 'layouts/LargeScreenLayout/CoreLayout/CoreLayout';
import EditCover from '../../components/EditCover';
import CqMobileLayout from 'layouts/LargeScreenLayout/CqMobileLayout/CqMobileLayout';
import components from './index';
import bg from './bg.png';

import classes from './MainBoard.scss';

class MainBoard extends Component {
  static propTypes = {
    dashboard: PropTypes.object,
    modules: PropTypes.array,
    mode: PropTypes.string
  }

  getModule(type) {
    const { modules, dashboard, mode } = this.props;
    const config = modules.find(mod => mod.type === type);
    const PanelComponent = config
      ? components[type]
        .find(component => component.type === config.display_type).component
      : components[type][0].component;

    return(
      <EditCover
        dashboard={dashboard.id}
        layout={config ? config.id : ''}
        mode={mode}
      >
        <PanelComponent config={config} />
      </EditCover>
    );
  }

  render() {
    const { dashboard } = this.props;
    const { template: { height, width } } = dashboard;
    return (
        <CqMobileLayout title={'防病毒场景态势'} width={width} height={height} >
          <div className={classes.top}>
            {this.getModule('VirusTypeDistrubution')}
          </div>
          <div className={classes.middle}>
            <div className={classes.leftMiddle}>
              {this.getModule('MasterControlIPAffectedHostTop5')}
            </div>
            <div className={classes.rightMiddle}>
              {this.getModule('ControlledIPVirusEventTop5')}
            </div>
          </div>
          <div className={classes.bottom}>
            {this.getModule('LatestSecurityEvent')}
          </div>
        </CqMobileLayout>
    );
  }
}

export default MainBoard;