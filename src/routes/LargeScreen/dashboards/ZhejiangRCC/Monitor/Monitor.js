import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import classnames from 'classnames';
import { numberWithCommas } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './Monitor.scss';
import { draw } from './background';

const exampleData = [{
  name: '10.67.0.25',
  count: 900
}, {
  name: '10.67.0.26',
  count: 760
}, {
  name: '10.67.0.27',
  count: 620
}, {
  name: '10.67.0.28',
  count: 300,
}, {
  name: '10.67.0.29',
  count: 240,
}];

const client = new ApiClient();

const ProgressBar = (props) => {
  const { percent, color } = props;
  return (
    <div className={classes.progress}>
      <div
        className={classes.progressBar}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.string,
};

export default class Monitor extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  static defaultProps = {
    config: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.requests = [];
    this.exampleData = exampleData;
  }

  componentDidMount() {
    const { config } = this.props;
    const refresh_interval = config ? config.refresh_interval || 60000 : 60000;
    this.loadData();
    this.timer = setInterval(() => this.loadData(), refresh_interval);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.config, nextProps.config)) {
      this.loadData(nextProps);
      if (this.props.config.refresh_interval &&
        nextProps.config.refresh_interval &&
        this.props.config.refresh_interval !== nextProps.config.refresh_interval) {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = setInterval(() => this.loadData(), nextProps.config.refresh_interval);
      }
    }
  }

  componentWillUnmount() {
    if (this.requests.length) {
      this.requests.forEach(request => request.cancel());
      this.requests = [];
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.canvasTimer) {
      clearInterval(this.canvasTimer);
    }
  }

  drawCanvas = (canvas) => {
    if (!canvas) {
      return;
    }

    let progress = 0;
    const ctx = canvas.getContext('2d');
    this.canvasTimer = setInterval(() => {
      if (progress < 100) {
        progress += 1;
      } else {
        progress = 0;
      }
      draw(ctx, progress);
    }, 50);
  }

  loadData(props) {
    const { config: { datasource_type, datasource, datasource_url } } = props || this.props;
    if (datasource_type !== 'STATIC' && datasource_url) {
      if (this.requests.length) {
        this.requests.forEach(request => request.cancel());
        this.requests = [];
      }
      this.divertRequest = makeCancelable(client.get(datasource_url));
      this.requests.push(this.divertRequest);
      this.divertRequest.promise.then((response) => {
        this.setState({
          data: response
        });
      });
    } else {
      const data = datasource ? datasource.formated_content : [];
      this.setState({
        data: data && data.length > 0 ? data : this.exampleData
      });
    }
  }

  render() {
    const { data } = this.state;
    const { config } = this.props;
    const itemSection = data.map((item, index) => {
      const { name, count } = item;
      return (
        <div key={index.toString()} className={classes.itemSection}>
          <div className={classes.name}>{name}</div>
          <div className={classes.count}>{count}</div>
          <div className={classes.countProgress}></div>
        </div>
      );
    });

    return (
      <div className="zj-rcc-card">
        <div className="zj-rcc-title">
          <span>{config && config.template_module && config.template_module.title || '事件分类统计'}</span>
        </div>
        {isEmpty(data) && (
          <div className={classes.noData}>
            <div>
              <Icon className={classes.noDataIcon} type="exclamation-circle" />
              <span>暂无数据</span>
            </div>
          </div>
        )}
        {!isEmpty(data) && (
          <div>
              {itemSection}
          </div>
        )}
      </div>
    );
  }
}
