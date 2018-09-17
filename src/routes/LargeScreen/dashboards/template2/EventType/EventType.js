import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './EventType.scss';

const exampleData = [{
  name: '上线',
  count: 100,
}, {
  name: '下线',
  count: 70,
}, {
  name: '危险端口开启',
  count: 55,
}, {
  name: 'WEB服务可用',
  count: 21,
}];

const client = new ApiClient();

export default class EventType extends Component {
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

  parseItem = (config, index) => {
    const { count, name } = config;
    return (
      <div key={index.toString()} className={classes.itemSection}>
        <div className={classes.itemCount}>{count}</div>
        <div className={classes.itemBar}>
          <div style={{ height: 75 * count / 100 }} >
            <div className={classes.itemBarInner} />
          </div>
        </div>
        <div className={classes.itemTitle}>{name}</div>
      </div>
    );
  }

  render() {
    const { data } = this.state;
    const { config } = this.props;

    const itemSection = [];
    data.forEach((item, index) => {
      itemSection.push(this.parseItem(item, index));
    });

    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <span>{config && config.title ? config.title : '事件分类统计'}</span>
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
          <div className={classes.itemContainer}>
            {itemSection}
          </div>
        )}
      </div>
    );
  }
}
