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
          <canvas ref={this.drawCanvas} width={1920} height={1080} className={classes.bgCanvas} />
        </div>
        <div className={classes.pageHeader}>
          {this.getModule('Header')}
        </div>
        <div className={classes.topLayout}>
          <div className={classes.leftTop}>
            {this.getModule('AliveAndRecord')}
            {this.getModule('AssetAllocation')}
          </div>
          <div className={classes.rightTop}>
            {this.getModule('PortTop5')}
            {this.getModule('ServiceTop5')}
          </div>
        </div>
        <div>
          <div className={classes.bottomLayout}>
            <div className={classes.bottomLeft}>
              <div className={classes.bottomLeftItem}>
                {this.getModule('EventHandle')}
              </div>
              <div className={classes.bottomLeftItem}>
                {this.getModule('EventType')}
              </div>
            </div>
            <div className={classes.bottomMid}>
              {this.getModule('Monitor')}
            </div>
            <div className={classes.bottomRight}>
              {this.getModule('TypeChange')}
            </div>
          </div>
        </div>
      </CoreLayout>
    );
  }
}

export default MainBoard;
