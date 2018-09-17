import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './RecentDdosEvent.scss';

const exampleData = [
  {status: 0, startTime: '2017-04-05 12:25:00', endTime: '2017-04-05 12:25:00', dip: '110.67.1.1', flow: '1G', top: 200},
  {status: 1, startTime: '2017-04-05 12:25:00', endTime: '2017-04-05 12:25:00', dip: '110.67.1.1', flow: '10G', top: 200},
  {status: 1, startTime: '2017-04-05 12:25:00', endTime: '2017-04-05 12:25:00', dip: '110.67.1.1', flow: '100M', top: 200},
  {status: 0, startTime: '2017-04-05 12:25:00', endTime: '2017-04-05 12:25:00', dip: '110.67.1.1', flow: '10M', top: 200},
  {status: 1, startTime: '2017-04-05 12:25:00', endTime: '2017-04-05 12:25:00', dip: '110.67.1.1', flow: '2G', top: 200},
];
const client = new ApiClient();

export default class RecentDdosEvent extends Component {
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
          <div className={classes.divisionTop}>
          </div>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '最近DDoS事件'} </span>
          </div>
          <div className={classes.content}>
            <table>
              <thead>
                <tr>
                  <th>状态</th>
                  <th>开始时间</th>
                  <th>结束时间</th>
                  <th>目的IP</th>
                  <th>流量值</th>
                  <th>峰值</th>
                </tr>
              </thead>
              {
                data.length > 0 && (
                <tbody>
                  {
                    data.map((item, idx) => (
                      <tr key={`${idx + 1}`}>
                        <td>
                          {item.status === 1 && (<span className={classes.circle}></span>)}
                          {item.status === 0 && (<span className={classes.arrow}></span>)}
                        </td>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                        <td>{item.dip}</td>
                        <td>{item.flow}</td>
                        <td>{item.top} bps</td>
                      </tr>
                    )
                  )}
                </tbody>
                )
              }
            </table>
            { data.length === 0 && (
              <div className={classes.noData}>
                <div>
                  <Icon className={classes.noDataIcon} type="exclamation-circle" />
                  <span>暂无数据</span>
                </div>
              </div>
            )}  
          </div>
        </div>
    );
  }
}
