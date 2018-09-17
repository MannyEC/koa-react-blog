import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import ReactEcharts from 'echarts-for-react';
import { Icon } from 'antd';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './NetworkTraffic.scss';

const client = new ApiClient();

const exampleData = {
  rx_bps: [
    [1530153573575, 123123],
    [1530153573585, 1123123],
    [1530153573595, 123123],
    [1530153573605, 2123123],
    [1530153573615, 123123],
    [1530153573625, 3123123]
  ],
  rx_pps: [
    [1530153573575, 123123],
    [1530153573585, 1123123],
    [1530153573595, 123123],
    [1530153573605, 2123123],
    [1530153573615, 123123],
    [1530153573625, 3123123]
  ],
  tx_bps: [
    [1530153573575, 123123],
    [1530153573585, 1123123],
    [1530153573595, 123123],
    [1530153573605, 2123123],
    [1530153573615, 123123],
    [1530153573625, 3123123]
  ],
  tx_pps: [
    [1530153573575, 123123],
    [1530153573585, 1123123],
    [1530153573595, 123123],
    [1530153573605, 2123123],
    [1530153573615, 123123],
    [1530153573625, 3123123]
  ],
  cur_tx_bps: 123123,
  cur_tx_pps: 123123,
  cur_rx_bps: 123123,
  cur_rx_pps: 123123,
  max_tx_bps: 123123,
  max_tx_pps: 123123,
  max_rx_bps: 123123,
  max_rx_pps: 123123,
  total_tx_bits: 123123,
  total_tx_packets: 123123,
  total_rx_bits: 123123,
  total_rx_packets: 123123
};

const getOption = (data, unit) => ({
  color: ['#35b97f', '#5accf2'],
  legend: {
    bottom: 0,
    itemGap: 80,
    left: 'center',
    textStyle: {
      color: '#888'
    },
    data: [{
      name: '下行流量',
      icon: 'rect'
    }, {
      name: '上行流量',
      icon: 'rect'
    }]
  },
  grid: {
    left: '3%',
    right: '4%',
    top: 25,
    bottom: 40,
    containLabel: true
  },
  xAxis: [{
    boundaryGap: false,
    type: 'time',
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255, 255, 255, .2)'
      }
    },
    axisLabel: {
      textStyle: {
        color: 'rgba(255, 255, 255, .7)'
      }
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }],
  yAxis: [{
    type: 'value',
    splitLine: {
      lineStyle: {
        color: ['#f2f2f2'],
        // type: 'dashed'
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255, 255, 255, .3)'
      }
    },
    axisLabel: {
      formatter(value) {
        return humansize(Math.abs(value));
      },
      textStyle: {
        color: 'rgba(255, 255, 255, .7)'
      }
    },
    axisTick: {
      show: false
    }
  }],
  series: [{
    name: '下行流量',
    type: 'line',
    areaStyle: {
      normal: {
        opacity: 0.3
      }
    },
    showSymbol: false,
    data: data[`rx_${unit}`] ? data[`rx_${unit}`] : [],
    smooth: true
  }, {
    name: '上行流量',
    type: 'line',
    areaStyle: {
      normal: {
        opacity: 0.3
      }
    },
    showSymbol: false,
    data: data[`tx_${unit}`] ? data[`tx_${unit}`].map(item => ([item[0], -item[1]])) : [],
    smooth: true
  }]
});

const checkNoData = (data, unit) =>
  !data[`tx_${unit}`] ||
  !data[`rx_${unit}`] ||
  (data[`tx_${unit}`].length === 0 && data[`rx_${unit}`].length === 0);

export default class NetworkTraffic extends Component {
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
      unit: 'bps'
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
      const data = datasource ? datasource.formated_content : {};
      this.setState({
        data: data && Object.keys(data).length > 0 ? data : this.exampleData
      });
    }
  }

  changeUnit(unit) {
    this.setState({
      unit
    });
  }

  render() {
    const { data, unit } = this.state;
    const { config } = this.props;
    const chartStyle = { width: 660, height: 320 };
    return (
      <PanelLayout>
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '网络流量趋势'}</span>
            <span className={classes.right}>
              <RadioGroup
                unit={unit}
                onChange={value => this.changeUnit(value)}
              />
            </span>
          </div>
          {checkNoData(data, unit) && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          <ReactEcharts
            notMerge
            lazyUpdate
            theme="ads_cloud"
            style={chartStyle}
            option={getOption(data, unit)}
          />
          <div className={classes.summary}>
            <div className={classes.boxGroup}>
              <div className={classes.box}>
                <p>{humansize(data[`cur_rx_${unit}`])}/{humansize(data[`cur_tx_${unit}`])}</p>
                <p>当前值(下行/上行)</p>
              </div>
              <div className={classes.box}>
                <p>{humansize(data[`max_rx_${unit}`])}/{humansize(data[`max_tx_${unit}`])}</p>
                <p>峰值(下行/上行)</p>
              </div>
            </div>
          </div>
        </div>
      </PanelLayout>
    );
  }
}
