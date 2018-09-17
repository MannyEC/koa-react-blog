import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { truncate, isEqual } from 'lodash';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import { Icon } from 'antd';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import classes from './AtkSrcGeoTop.scss';

const client = new ApiClient();

const exampleData = [{
  src_country: '澳大利亚',
  code: 'AU',
  total_flow: 228000000.0,
  unit: 'bps'
}, {
  src_country: '美国',
  code: 'US',
  total_flow: 218000000.0,
  unit: 'bps'
}, {
  src_country: '中国',
  code: 'CN',
  total_flow: 208000000.0,
  unit: 'bps'
}, {
  src_country: '韩国',
  code: 'KR',
  total_flow: 198000000.0,
  unit: 'bps'
}, {
  src_country: '日本',
  code: 'JP',
  total_flow: 188000000.0,
  unit: 'bps'
}];

export default class AtkSrcGeoTop extends Component {
  static propTypes = {
    config: PropTypes.object,
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
    const atkSrcData = data.filter((item, index) => index < 5);
    return (
      <PanelLayout>
        <div className={classes.container}>
          <div className={classes.header}>
            {config && config.title ? config.title : '攻击源地理位置TOP5'}
          </div>
          <div className={classes.content}>
            {atkSrcData.length === 0 && (<div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>)}
            {atkSrcData.map((item, index) => {
              const src = item.code ? require(`styles/assets/flags/${item.code.toLowerCase()}.svg`) : '';
              return (
                <div className={classes.column} key={item.src_country}>
                  <div className={classes.firstLine}>
                    <div className={classes.number}>
                      NO.{index + 1}
                    </div>
                  </div>
                  <div className={classes.secondLine}>
                    <img
                      src={src}
                      alt=""
                      className={classes.flag}
                    />
                  </div>
                  <div className={classes.country}>
                    {truncate(item.src_country, { length: 12 })}
                  </div>
                  <div className={classes.flow}>
                    {`${humansize(Math.abs(item.total_flow))} ${item.unit}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PanelLayout>
    );
  }
}
