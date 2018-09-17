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
  name: '事件数',
  count: 16021801
}, {
  name: '变更资产数',
  count: 23218
}, {
  name: '存活资产数',
  count: 160218
}, {
  name: '监控资产数',
  count: 162000,
}, {
  name: '监控次数',
  count: 162000,
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
    return (
      <div>
        <div className={classes.container}>
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
              <canvas
                ref={this.drawCanvas}
                width={640}
                height={640}
                className={classes.monitorCanvas}
              />
              <div
                className={classnames({
                  [classes.HexagonalSection]: true,
                  [classes.HexagonalTop]: true,
                })}
              >
                <span>{numberWithCommas(data[0].count)}</span>
                <span>{data[0].name}</span>
              </div>
              <div
                className={classnames({
                  [classes.HexagonalSection]: true,
                  [classes.HexagonalLeft]: true,
                })}
              >
                <span>{numberWithCommas(data[1].count)}</span>
                <span>{data[1].name}</span>
              </div>
              <div
                className={classnames({
                  [classes.HexagonalSection]: true,
                  [classes.HexagonalRight]: true,
                })}
              >
                <span>{numberWithCommas(data[2].count)}</span>
                <span>{data[2].name}</span>
              </div>
              <div className={classes.innerDataContiner}>
                <div>
                  <p className={classes.innerTitle}>{numberWithCommas(data[3].count)}</p>
                  <p className={classes.innerNum}>{data[3].name}</p>
                </div>
                <div>
                  <p className={classes.innerTitle}>{numberWithCommas(data[4].count)}</p>
                  <p className={classes.innerNum}>{data[4].name}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
