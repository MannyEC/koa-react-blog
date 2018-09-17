import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './DnsOverallAnalyticIndicators.scss';

const exampleData = {
  rate: '94.13%',
  count: '3832.22G',
  time: 4745.45
};

const client = new ApiClient();

export default class DnsOverallAnalyticIndicators extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  static defaultProps = {
    config: {}
  }

  constructor(props) {
    super(props);  // 这行代码不能少哦
    this.state = { // 对内部状态进行初始化，即设置组件最初的状态是什么
      data: {}
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
        data: data && Object.keys(data).length > 0 ? data : this.exampleData
      });
    }
  }

  render() {
    const { data } = this.state;
    const { config } = this.props;
    return (
        <div className={classes.container}>
          <div className={classes.bg}>
            <div className={classes.header}>
              <span>{config && config.title ? config.title : 'DNS整体解析指标'}</span>
            </div>
            <div className={classes.content}>
              <div className={classes.rate}>
                <div className={classes.rateBg}>                  
                </div>
                <div className={classes.rateText}>
                  <span className={classes.rateNumber}>
                    {Object.keys(data).length > 0 && data.rate}
                    {Object.keys(data).length === 0 && '0%' }
                  </span>
                  <span style={{fontSize: '18px'}}>成功率</span>
                </div>                 
              </div>
              <div className={classes.countCon}>
                <div className={classes.count}>
                  <span className={classes.countNumber}>
                    {Object.keys(data).length > 0 && data.count}
                    {Object.keys(data).length === 0 && '0' }
                  </span>
                  <span style={{fontSize: '18px'}}>成功数</span>                
                </div>
                <div className={classes.count}>
                  <span className={classes.countNumber}>
                    {Object.keys(data).length > 0 && data.time}
                    {Object.keys(data).length === 0 && '0' }
                  </span>
                  <span style={{fontSize: '18px'}}>平均时延(MS)</span>                
                </div>
              </div>
            </div>
          </div>                    
        </div>
    )
  }
}
