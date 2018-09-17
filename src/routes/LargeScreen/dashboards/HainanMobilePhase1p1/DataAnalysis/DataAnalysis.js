import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import PanelLayout from 'layouts/HN1PanelLayout';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import DataAnalysisChart from 'components/DataAnalysis';
import classes from './DataAnalysis.scss';

const exampleData = {
  left: [
    '网站安全',
    '漏洞扫描',
    '异常流量',
    '网站扫描',
    '入侵检测',
    '其他设备',
    '沙箱检测'
  ],
  center: '大数据分析',
  right: [{
    name: 'DNS&CDN劫持',
    count: 5
  }, {
    name: '网站事件',
    count: 10
  }, {
    name: '敏感信息泄露',
    count: 8
  }, {
    name: '恶意程序',
    count: 7
  }, {
    name: '异常流量',
    count: 19
  }, {
    name: '入侵事件',
    count: 6
  }, {
    name: '僵尸网络',
    count: 0
  }]
};

const client = new ApiClient();

export default class DataAnalysis extends Component {
  static propTypes = {
    config: PropTypes.object
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
    this.loadData = this.loadData.bind(this);
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
        data: data && Object.keys(data).length > 0 ? data : this.exampleData
      });
    }
  }

  render() {
    const { data } = this.state;
    const { config } = this.props;
    return (
      <PanelLayout title={config && config.title ? config.title : '大数据安全分析'}>
        <div className={classes.container}>
          {isEmpty(data) && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          {!isEmpty(data) &&
            <DataAnalysisChart config={this.state.data} />
          }
        </div>
      </PanelLayout>
    );
  }
}
