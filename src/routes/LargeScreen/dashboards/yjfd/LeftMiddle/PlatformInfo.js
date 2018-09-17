import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { numberWithCommas } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import YJFDLayout from 'layouts/LargeScreenLayout/YJFDLayout';
import btn from './btn.png';

import classes from './PlatformInfo.scss';
const exampleData = [{
  blockIp: 10,
  blockDomain: 20,
}];

const client = new ApiClient();

export default class PlatformInfo extends Component {
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
  handleClick(){
    window.alert("封堵成功");
  }
  render() {
    const { data } = this.state;
    const { config } = this.props;
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
          <div className={classes.blockIp}>
               <span>封堵IP：</span>
                <span>{data[0].blockIp}</span>
          </div>
          <div className={classes.blockDomain}>
               <span>封堵域名：</span>
                <span>{data[0].blockDomain}</span>
          </div>
          <div className={classes.blockBtn} onClick={this.handleClick}>一键封堵</div>
       </div>}
        </div>
      </YJFDLayout>
    );
  }
}
