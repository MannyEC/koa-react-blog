import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { numberWithCommas } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './AliveAndRecord.scss';

const exampleData = [{
  aliveIp: 412432,
  aliveWebsite: 162000,
  disposed: 10000,
  disposedPercent: 50,
  ensured: 12000,
  ensuredPercent: 70,
}];

const client = new ApiClient();

const ProgressBar = (props) => {
  const { percent, color } = props;
  return (
    <div className={classes.progress}>
      <div
        style={{ width: `${percent}%`, height: '100%' }}
      >
        <div
          className={classes.progressBar}
          style={{ borderTop: `11px solid ${color}` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.string,
};

export default class AliveAndRecord extends Component {
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
    return (
      <div>
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '存活和备案'}</span>
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
              <div className={classes.aliveItem}>
                <span>存活IP</span>
                <span>{numberWithCommas(data[0].aliveIp)}</span>
              </div>
              <div className={classes.aliveItem}>
                <span>存活网站</span>
                <span>{numberWithCommas(data[0].aliveWebsite)}</span>
              </div>
              <div>
                <ProgressBar percent={data[0].disposedPercent} color="#fadf49" />
                <div className={classes.progressText}>
                  已处置<span style={{ color: '#fadf49' }}>{numberWithCommas(data[0].disposed)}</span>个
                </div>
              </div>
              <div>
                <ProgressBar percent={data[0].ensuredPercent} color="#0595ab" />
                <div className={classes.progressText}>
                  已处置<span style={{ color: '#00e4ff' }}>{numberWithCommas(data[0].ensured)}</span>个
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
