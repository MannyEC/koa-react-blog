import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { numberWithCommas } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './ServiceTop5.scss';

const exampleData = [{
  name: '22/SSH',
  count: 500,
}, {
  name: '115/sftp',
  count: 400,
}, {
  name: '危险端口开启',
  count: 300,
}, {
  name: 'WEB服务可用',
  count: 200,
}, {
  name: 'WEB服务',
  count: 100,
}];

const client = new ApiClient();

const parseItemSection = dataUnit => (
  <div key={dataUnit.name}>
  </div>
);

export default class ServiceTop5 extends Component {
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

    const itemList = [];
    data.forEach((dataUnit) => {
      itemList.push(parseItemSection(dataUnit));
    });
    return (
      <div className="zj-rcc-card">
        <div className="zj-rcc-title">
          <span>{config && config.title ? config.title : '服务TOP5'}</span>
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
          <div className={classes.innerContainer}>
            {itemList}
          </div>
        )}
      </div>
    );
  }
}
