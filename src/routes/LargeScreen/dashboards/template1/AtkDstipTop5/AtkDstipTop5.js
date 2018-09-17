import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './AtkDstipTop5.scss';

const exampleData = [{
  max_bps: 228000000.0,
  dstip: '1.1.1.1',
  max_pps: 250000.0
}, {
  max_bps: 228000000.0,
  dstip: '1.1.1.2',
  max_pps: 250000.0
}, {
  max_bps: 228000000.0,
  dstip: '1.1.1.3',
  max_pps: 250000.0
}, {
  max_bps: 228000000.0,
  dstip: '1.1.1.4',
  max_pps: 250000.0
}, {
  max_bps: 228000000.0,
  dstip: '1.1.1.5',
  max_pps: 250000.0
}];

const client = new ApiClient();

const getOption = (data, unit) => ({
  title: {
    show: false
  },
  grid: {
    show: true,
    top: 10,
    left: 135,
    right: 60,
    bottom: 20,
    borderColor: '#fff'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter(params) {
      const param = params[0] || {};
      return `${param.name} <br /> 攻击目的流量峰值 ${humansize(param.value)}`;
    }
  },
  legend: {
    show: false
  },
  toolbox: {
    show: false,
    data: ['Attack Count']
  },
  calculable: true,
  yAxis: [{
    type: 'category',
    data: data.map(item => item.dstip),
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 1)',
      fontSize: 13,
    },
    axisLine: {
      lineStyle: {
        color: '#2e4368'
      }
    }
  }],
  xAxis: [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisLabel: {
      formatter(value) {
        return humansize(Math.abs(value));
      },
      color: 'rgba(255, 255, 255, 1)',
      fontSize: 13,
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: ['#F2F2F2'],
        type: 'solid'
      }
    }
  }],
  series: [
    {
      name: 'Attack Count',
      type: 'bar',
      barWidth: '25px',
      data: data.map(value => (unit === 'bps' ? value.max_bps : value.max_pps)),
      itemStyle: {
        color: 'rgba(3,189,122,0.40)',
        borderColor: '#03BD7A'
      },
    }
  ]
});

export default class AtkDstipTop5 extends Component {
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
      currentUnit: 'bps'
    };
    this.requests = [];
    this.exampleData = exampleData;
    this.changeUnit = this.changeUnit.bind(this);
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

  changeUnit(unit) {
    this.setState({
      currentUnit: unit
    });
  }

  render() {
    const { data } = this.state;
    const { config } = this.props;
    const chartData = cloneDeep(data).reverse();
    return (
      <PanelLayout>
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '攻击目的IP—流量峰值 TOP5'}</span>
          </div>
          <div className={classes.selector}>
            <RadioGroup
              unit={this.state.currentUnit}
              onChange={value => this.changeUnit(value)}
            />
          </div>
          {data.length === 0 && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          {data.length > 0 &&
            <ReactEcharts
              notMerge
              lazyUpdate
              theme="ads_cloud"
              style={{ width: 450, height: 350 }}
              option={getOption(chartData, this.state.currentUnit)}
            />
          }
        </div>
      </PanelLayout>
    );
  }
}
