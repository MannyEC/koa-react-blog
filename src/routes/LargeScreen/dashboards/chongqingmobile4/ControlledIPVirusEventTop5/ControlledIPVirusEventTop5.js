import React, { Component } from 'react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ReactEcharts from 'echarts-for-react';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './ControlledIPVirusEventTop5.scss';

const exampleData = {
  "10.67.1.126 北京":120,
  "10.67.1.123 天津":110,
  "10.67.1.57 湖北":100,
  "1.2.3.4 广东":90,
  "58.66.24.47 西藏":86,
  "其他":86
}

const client = new ApiClient();

const getOption = (data) => ({
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow'
      }
  },
  grid: {
      containLabel: true
  },
  xAxis: {
      show:false,
      type: 'value',
  },
  yAxis: {
      type: 'category',
      data: Object.keys(data),
      inverse:true,
      axisTick:{
          show:false
      },
      axisLine:{
          show:false
      },
      axisLabel: {
          show: true,
          textStyle: {
              color: '#fff'
          }
      },
  },
  series: [
    {
        stack: 'chart',
        type: 'bar',
        data: Object.keys(data).map(function (key) {
            return data[key];
        }),
        barWidth:10,
        barCategoryGap:'10',
        itemStyle:{
            color:'rgb(0,230,238)',
        },
        label: {
                formatter: '{c}'+'个',
                show:true,
                position:[350, -1]
        }
    },
    {
        type: 'bar',
        stack: 'chart',
        silent: true,
        barCategoryGap:'10',
        data: Object.keys(data).map(function (key) {
            return 150 - data[key];
        }),
        itemStyle: {
            normal: {
                color: 'rgb(31,48,76)'
            }
        },
    }
  ]
});

export default class ControlledIPVirusEventTop5 extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  static defaultProps = {
    config: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {}
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
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : 'TOP5被控IP病毒事件情况'}</span>
          </div>
          <div className={classes.barChart}>
          <ReactEcharts
              notMerge
              lazyUpdate
              style={{ width: 550, height: 350 }}
              option={getOption(data)}
            />
            </div>
        </div>
    );
  }
}