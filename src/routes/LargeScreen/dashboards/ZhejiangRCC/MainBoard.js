import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CoreLayout from 'layouts/LargeScreenLayout/CoreLayout/CoreLayout';
import EditCover from '../../components/EditCover';
import { draw } from './background.js';
import bg from './bg.jpg';
import components from './index';

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

    return (
      <EditCover
        dashboard={dashboard.id}
        layout={config ? config.id : ''}
        mode={mode}
      >
        <PanelComponent config={config} />
      </EditCover>
    );
  }

  drawCanvas = (canvas) => {
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    draw(ctx);
  }

  render() {
    const { dashboard } = this.props;
    const { template: { height, width } } = dashboard;

    return (
      <CoreLayout width={width} height={height} background={bg}>
        <div>
        </div>
        <div className={classes.grid}>
            <div className={classes.item1}>{this.getModule('Header')}</div>
            <div className={classes.item2}>{this.getModule('AliveAndRecord')}</div>
            <div className={classes.item3}>{this.getModule('PortTop5')}</div>
            <div className={classes.item4}>
              <div>{this.getModule('AssetAllocation')}</div>
              <div>{this.getModule('ServiceTop5')}</div>
            </div>
            <div className={classes.item6}>{this.getModule('EventHandle')}</div>
            <div className={classes.item7}>{this.getModule('EventType')}</div>
            <div className={classes.item8}>{this.getModule('Monitor')}</div>
        </div>
      </CoreLayout>
    );
  }
}

export default MainBoard;
