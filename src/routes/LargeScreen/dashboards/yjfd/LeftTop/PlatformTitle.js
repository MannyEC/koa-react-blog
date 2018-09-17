import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Icon } from 'antd';
import ReactEcharts from 'echarts-for-react';
import YJFDLayout from 'layouts/LargeScreenLayout/YJFDLayout';
import ApiClient from 'helpers/ApiClient';

import classes from './PlatformTitle.scss';

const exampleData = [{
  title: '一键封堵平台',
}];
const client = new ApiClient();

export default class PlatformTitle extends Component {
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
    // const chartStyle = { width: 660, height: 320 };
    return (
      <YJFDLayout>
        <div className={classes.container}>
          <div className={classes.header}>
            <span></span>
          </div>
         {data.length === 0 && (
             <div className={classes.noData}>
                <div>
                   <Icon className={classes.noDataIcon} type="exclamation-circle" />
                   <span>暂无数据 </span>
                </div>
             </div>
          )}
         {data.length > 0 &&  <div className={classes.content}>
          <div className={classes.headerText}>
            {data[0].title}
          </div>
       </div>}
        </div>
      </YJFDLayout>
    );
  }
}
