import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './DnsServerAnalyticIndicators.scss';

const exampleData = [
  {ip: '192.168.1.1', success_rate: 90, success_count: 100, time: 45},
  {ip: '192.168.1.2', success_rate: 68, success_count: 90, time: 50},
  {ip: '192.168.1.3', success_rate: 92, success_count: 92, time: 43},
  {ip: '192.168.1.4', success_rate: 66, success_count: 77, time: 42},
  {ip: '192.168.1.5', success_rate: 60, success_count: 75, time: 65},
  {ip: '192.168.1.6', success_rate: 88, success_count: 100, time: 42},
  {ip: '192.168.1.7', success_rate: 66, success_count: 90, time: 45},
  {ip: '192.168.1.8', success_rate: 53, success_count: 50, time: 56},
  {ip: '192.168.1.9', success_rate: 51, success_count: 43, time: 48},
  {ip: '192.168.1.10', success_rate: 96, success_count: 76, time: 34}
];

const client = new ApiClient();

export default class DnsServerAnalyticIndicators extends Component {
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
    const refresh_interval = config ? config.refresh_interval || 6000 : 6000;
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

  // 销毁定时器
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
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.headerBg}>
              <span>{config && config.title ? config.title : 'DNS服务器解析指标'}</span>
            </div>
          </div>
          {data.length === 0 && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          {
            data.length > 0 && 
            <div className={classes.content}>
              <div className={classes.conItem}>
                <span style={{width: '29%', paddingLeft: '17px'}}>IP地址</span>
                <span style={{width: '21%'}}>成功率</span>
                <span style={{width: '21%'}}>成功数</span>
                <span style={{width: '29%'}}>平均延时(MS)</span>
              </div>
              <div className={classes.conList}>
              {
                data.map((item, idx) => {
                  if (idx % 2 === 0) {
                    return (
                      <div className={classes.evenItem} key={item.ip}>
                        <div className={classes.evenItemBg}>
                          <span style={{width: '29%', marginLeft: '15px'}}>{item.ip}</span>
                          <span style={{width: '21%'}} className={classes.successRate}>{item.success_rate}</span>
                          <span style={{width: '21%', fontSize: '18px'}}>{item.success_count}</span>
                          <span style={{width: '29%', fontSize: '18px'}}>{item.time}</span>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className={classes.oddItem} key={item.ip} >
                        <div className={classes.oddItemBg}>
                          <span style={{width: '29%', marginLeft: '15px'}}>{item.ip}</span>
                          { item.success_rate >= 80 && 
                            <span style={{width: '21%'}} className={classes.successRate}>
                              {item.success_rate}
                            </span>
                          }
                          { item.success_rate < 80 && 
                            <span style={{width: '21%', color: '#e95a4b'}} className={classes.successRate}>
                              {item.success_rate}
                            </span>
                          }
                          <span style={{width: '21%', fontSize: '18px'}}>{item.success_count}</span>
                          <span style={{width: '29%', fontSize: '18px'}}>{item.time}</span>
                        </div>
                      </div>
                    )
                  }
                }                  
              )}
              </div>
            </div> 
          }
        </div>
    );
  }
}
