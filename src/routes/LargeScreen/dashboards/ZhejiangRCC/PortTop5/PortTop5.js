import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon, Tag } from 'antd';
import { numberWithCommas } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './PortTop5.scss';

const exampleData = [{
  name: '北京',
  count: 700,
  percent: 60,
}, {
  name: '福建',
  count: 600,
  percent: 50,
}, {
  name: '陕西',
  count: 500,
  percent: 40,
}, {
  name: '内蒙古',
  count: 260,
  percent: 30,
}, {
  name: '辽宁',
  count: 100,
  percent: 20,
}, {
  name: '黑龙江',
  count: 50,
  percent: 50,
}, {
  name: '江苏',
  count: 45,
  percent: 40,
}, {
  name: '重庆',
  count: 40,
  percent: 30,
}, {
  name: '新疆',
  count: 10,
  percent: 20,
}];

const client = new ApiClient();

const ProgressBar = (props) => {
  const { percent, color } = props;
  return (
    <div className={classes.progress}>
      <div
        className={classes.progressBar}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.string,
};

export default class PortTop5 extends Component {
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

    const itemList = data.map((dataUnit, index) => (
      <div className={classes.itemSection} key={dataUnit.name}>
        <div><Tag color="#2db7f5">{index+1}</Tag></div>
        <div className={classes.name}>{dataUnit.name}</div>
        <div className={classes.count}>{dataUnit.count}</div>
      </div>
    ));
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
          <div className={classes.innerContainer}>
            {itemList}
          </div>
        )}
      </div>
    );
  }
}
