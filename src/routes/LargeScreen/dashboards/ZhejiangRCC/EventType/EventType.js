import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon, Tag } from 'antd';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './EventType.scss';

const exampleData = [{
  location: '北京',
  domain: 'https://www.baidu.com',
}, {
  location: '上海',
  domain: 'https://www.baidu.com',
}, {
  location: '武汉',
  domain: 'https://www.baidu.com',
}, {
  location: '北京',
  domain: 'https://www.baidu.com',
}, {
  location: '北京',
  domain: 'https://www.baidu.com',
}];

const client = new ApiClient();

const ProgressBar = (props) => {
  const { percent, color } = props;
  return (
    <div className={classes.progress}>
      <div
        className={classes.progressBar}
        style={{ width: `${percent}%`, borderTop: `11px solid ${color}` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.string,
};

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
    const { location, domain } = config;
    return (
      <div key={index.toString()} className={classes.itemSection}>
        <div className={classes.index}><Tag color="#f50">{index+1}</Tag></div>
        <div className={classes.location}>{location}</div>
        <div className={classes.domain}>{domain}</div>
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
      <div className="zj-rcc-card">
        <div className="zj-rcc-title">
          <span>{config && config.template_module && config.template_module.title || '事件分类统计'}</span>
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
