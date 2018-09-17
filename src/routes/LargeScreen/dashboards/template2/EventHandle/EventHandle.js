import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ReactDOM from 'react-dom';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './EventHandle.scss';
import { draw } from './background';

const exampleData = [{
  name: '新建',
  count: 500
}, {
  name: '已处理',
  count: 456
}, {
  name: '已接受',
  count: 1245
}, {
  name: '已失效',
  count: '--'
}];

const client = new ApiClient();

const ProgressBar = (props) => {
  const { percent, color } = props;
  return (
    <div className={classes.progress}>
      <div
        className={classes.progressBar}
        style={{ width: `${percent}%`, borderTop: `11px solid ${color}` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.string,
};

export default class EventHandle extends Component {
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
    this.initCanvas();
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
      clearTimeout(this.canvasTimer);
    }
  }

  initCanvas() {
    const canvas = ReactDOM.findDOMNode(this.refs.eventBg);
    const ctx = canvas.getContext('2d');
    let rotate = 0;
    this.canvasTimer = setInterval(() => {
      draw(ctx, rotate);
      rotate += 1;
      if (rotate > 100) {
        rotate = 0;
      }
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

  parseItem = (config, index) => {
    return (
      <div key={index.toString()} className={classes.itemSection}>
        <div className={classes.itemCount}>{config.count}</div>
        <div className={classes.itemTitle}>{config.name}</div>
      </div>
    );
  }

  render() {
    const { data } = this.state;
    const { config } = this.props;
    const itemSection = [];

    data.forEach((item, index) => {
      itemSection.push(this.parseItem(item, index));
    });
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <span>{config && config.title ? config.title : '事件处理状态'}</span>
        </div>
        {isEmpty(data) && (
          <div className={classes.noData}>
            <div>
              <Icon className={classes.noDataIcon} type="exclamation-circle" />
              <span>暂无数据</span>
            </div>
          </div>
        )}
        <canvas ref="eventBg" width={480} height={100} className={classes.eventBg} />
        {!isEmpty(data) && (
          <div className={classes.itemContainer}>{itemSection}</div>
        )}
      </div>
    );
  }
}
