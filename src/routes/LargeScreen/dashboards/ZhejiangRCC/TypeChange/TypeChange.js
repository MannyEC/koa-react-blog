import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './TypeChange.scss';

const exampleData = [
  { name: 'OS变更', value: 267, max: 300 },
  { name: '端口变更', value: 216, max: 300 },
  { name: '服务变更', value: 280, max: 300 },
  { name: '备案变更', value: 4.8, max: 20 },
  { name: '存活变更', value: 108, max: 300 },
  { name: '其他', value: 64, max: 100 },
];

const client = new ApiClient();

const getOption = data => ({
  radar: {
    indicator: data,
    shape: 'circle',
    splitNumber: 5,
    name: {
      textStyle: {
        color: '#fff',
        fontSize: 18,
      }
    },
    splitLine: {
      lineStyle: {
        color: [
          'rgba(4, 218, 255, 0.1)', 'rgba(4, 218, 255, 0.2)',
        ].reverse()
      }
    },
    splitArea: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(4, 218, 255, 0.5)'
      }
    },
    axisTick: {
      show: true,
    }
  },
  series: [
    {
      name: '北京',
      type: 'radar',
      lineStyle: {
        normal: {
          width: 1,
          opacity: 1
        }
      },
      data: [data.map(item => item.value)],
      symbol: 'none',
      itemStyle: {
        normal: {
          color: '#04daff'
        }
      },
      areaStyle: {
        normal: {
          opacity: 0.1
        }
      }
    }
  ]
});

export default class TypeChange extends Component {
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
    return (
      <div className="zj-rcc-card">
        <div className="zj-rcc-title">
          <span>{config && config.title ? config.title : '变更类型统计'}</span>
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
            option={getOption(data)}
          />
        }
      </div>
    );
  }
}
