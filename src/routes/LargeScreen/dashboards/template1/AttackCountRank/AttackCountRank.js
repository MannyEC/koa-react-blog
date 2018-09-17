import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Icon } from 'antd';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import classNames from 'classnames';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './AttackCountRank.scss';

const client = new ApiClient();

const getUnitClass = idx => classNames({
  [classes.unit]: idx === 1,
  [classes.unit2]: idx === 2,
  [classes.unit3]: idx === 3,
  [classes.unit4]: idx === 4,
  [classes.unit5]: idx === 5
});

const getUnitColor = idx => classNames({
  [classes.color]: idx === 1,
  [classes.color2]: idx === 2,
  [classes.color3]: idx === 3,
  [classes.color4]: idx === 4,
  [classes.color5]: idx === 5
});

const exampleData = [
  { dstip: '1.1.121', count: 10 },
  { dstip: '191.161.121.211', count: 8 },
  { dstip: '1.1.12.1', count: 8 },
  { dstip: '1.1.1.12', count: 7 },
  { dstip: '1.1.1.13', count: 1 }
];

export default class AtkSrcGeoTop extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  static defaultProps = {
    config: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      data: []
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
      <PanelLayout>
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '攻击次数排名'}</span>
          </div>
          {data.length === 0 && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          {data.length > 0 && <div className={classes.content}>
            {data.map((item, idx) => (
              <div className={getUnitClass(idx + 1)} key={item.dstip} >
                <span className={getUnitColor(idx + 1)}>{idx + 1}</span>
                <span className={classes.dstip}>{item.dstip}</span>
                <span className={classes.detail}>
                  攻击次数:
                  <span className={classes.number}>{item.count}</span>
                </span>
              </div>
            ))}
          </div> }
        </div>
      </PanelLayout>
    );
  }
}
