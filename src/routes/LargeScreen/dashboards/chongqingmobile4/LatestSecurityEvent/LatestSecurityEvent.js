import React, { Component } from 'react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import classNames from 'classnames';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './LatestSecurityEvent.scss';

const exampleData = [
{
  level:1,
  sip:'1.2.3.4',
  source_address:'未知',
  event_name:'gh0st',
  event_type:'virus',
  first_time:'2017-07-03:21:09:23',
  latest_time:'2017-07-03:21:09:23',
  host_num:5,
  attack_num:20
},
{
  level:2,
  sip:'1.2.3.4',
  source_address:'未知',
  event_name:'gh0st',
  event_type:'malware',
  first_time:'2017-07-03:21:09:23',
  latest_time:'2017-07-03:21:09:23',
  host_num:5,
  attack_num:20
},
{
  level:3,
  sip:'1.2.3.4',
  source_address:'未知',
  event_name:'gh0st',
  event_type:'troyan',
  first_time:'2017-07-03:21:09:23',
  latest_time:'2017-07-03:21:09:23',
  host_num:5,
  attack_num:20
},
{
  level:1,
  sip:'1.2.3.4',
  source_address:'未知',
  event_name:'gh0st',
  event_type:'worm',
  first_time:'2017-07-03:21:09:23',
  latest_time:'2017-07-03:21:09:23',
  host_num:5,
  attack_num:20
},
];

const getItemLevel = level => classNames({
  [classes.safety]: level === 1,
  [classes.warn]: level === 2,
  [classes.danger]: level === 3
});

const getEventType = type => classNames({
  [classes.troyanIcon]: type === "troyan",
  [classes.virusIcon]: type === "virus",
  [classes.wormIcon]: type === "worm",
  [classes.malwareIcon]: type === "malware"
});

const client = new ApiClient();

export default class LatestSecurityEvent extends Component {
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
        <div className={classes.container}>
          <div className={classes.header}>最新安全事件</div>
          <table className={classes.table}>
            <thead>
              <tr>
                  <th></th>
                  <th>源IP</th>
                  <th>源地址</th>
                  <th>事件名称</th>
                  <th>事件类型</th>
                  <th>首次时间</th>
                  <th>最近事件</th>
                  <th>影响主机数</th>
                  <th>攻击次数</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr><td>
              <div className={classes.noData}>
                <div>
                  <Icon className={classes.noDataIcon} type="exclamation-circle" />
                  <span>暂无数据</span>
                </div>
              </div>
              </td>
              </tr>
              )}
              {data.length > 0 && data.map((item, idx) => (
                  <tr>
                    <td><div className={getItemLevel(item.level)}></div></td>
                    <td>{item.sip}</td>
                    <td>{item.source_address}</td>
                    <td>{item.event_name}</td>
                    <td><div className={getEventType(item.event_type)}></div></td>
                    <td>{item.first_time}</td>
                    <td>{item.latest_time}</td>
                    <td>{item.host_num}</td>
                    <td>{item.attack_num}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
    );
  }
}
