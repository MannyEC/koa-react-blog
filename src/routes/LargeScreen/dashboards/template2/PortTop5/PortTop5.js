import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { numberWithCommas } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './PortTop5.scss';

const exampleData = [{
  name: 'SSH',
  count: 700,
  percent: 60,
}, {
  name: 'Apache',
  count: 600,
  percent: 50,
}, {
  name: 'Tomcat',
  count: 500,
  percent: 40,
}, {
  name: 'Nginx',
  count: 260,
  percent: 30,
}, {
  name: 'Memcache',
  count: 100,
  percent: 20,
}];

const client = new ApiClient();

const ProgressBar = (props) => {
  const { percent } = props;
  return (
    <div className={classes.progress}>
      <div
        style={{ width: `${percent}%`, height: '100%' }}
      >
        <div className={classes.progressBar} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.string,
};

const parseProgressSection = dataUnit => (
  <div key={dataUnit.name}>
    <div className={classes.progressText}>
      <span style={{ color: '#ffffff' }}>{dataUnit.name}</span>
      <span style={{ color: '#00e4ff' }}>{numberWithCommas(dataUnit.count)}</span>
    </div>
    <ProgressBar percent={dataUnit.percent} color="#fadf49" />
  </div>
);

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

    const itemList = [];
    data.forEach((dataUnit) => {
      itemList.push(parseProgressSection(dataUnit));
    });
    return (
      <div>
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '端口TOP5'}</span>
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
      </div>
    );
  }
}
