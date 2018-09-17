import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import YJFDLayout from 'layouts/LargeScreenLayout/YJFDLayout';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';

import classes from './BlockTimeTop5.scss';
const exampleData = {
ip:[
  {blkip: '1.1.1.1', num: 50.0},
  {blkip: '1.1.1.2',num: 8.0}, 
  {blkip: '1.1.1.3',num: 10.0}, 
  {blkip: '1.1.1.4',num: 2.0},
  {blkip: '1.1.1.5',num: 8}
],
domain:[
  {blkdomain: 'www.baidu.com',num: 50.0}, 
  {blkdomain: 'www.sohu.com', num: 8.0}, 
  {blkdomain: 'www.google.com',num: 10.0},
  {blkdomain: 'www.abc.com',num: 2.0},
  {blkdomain: 'www.ddd.com',num: 8}
]
};

const client = new ApiClient();

const getOption1 = (data) => ({
  title: {
    show: false
  },
  grid: {
    show: false,
    top: 20,
    left: 80,
    right: 60,
    bottom: 20,
    borderColor: '#fff'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter(params) {
      const param = params[0] || {};
      return `${param.name} <br /> 封堵时常TOP5 ${humansize(param.value)}`;
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
    data: data.map(item => item.blkip),
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLabel: {
      show:true,
      color: '#fff',
      fontSize: 14,
    },
    axisLine: {
      lineStyle: {
        color: '#313b45'
      }
    },
    splitLine: {
      lineStyle: {
        color: ['#313b45'],
        type: 'solid'
      }
    }
  }],
  xAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#313b45'
      }
    },
    axisLabel: {
      formatter(value) {
        return humansize(Math.abs(value));
      },
      color: '#fff',
      fontSize: 14,
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: ['#313b45'],
        type: 'solid'
      }
    }
  }],
  series: [
    {
      name: 'Attack Count',
      type: 'bar',
      barWidth: '20px',
      data: data.map(item => item.num),
      itemStyle: {
        color: '#04c5e8',
      },
    }, 
  ]
});
const getOption2 = (data) => ({
  title: {
    show: false
  },
  grid: {
    show: false,
    top: 20,
    left: 120,
    right: 60,
    bottom: 20,
    borderColor: '#fff'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter(params) {
      const param = params[0] || {};
      return `${param.name} <br /> 封堵时常TOP5 ${humansize(param.value)}`;
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
    data: data.map(item => item.blkdomain),
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLabel: {
      show:true,
      color: '#fff',
      fontSize: 14,
    },
    axisLine: {
      lineStyle: {
        color: '#313b45'
      }
    },
    splitLine: {
      lineStyle: {
        color: ['#313b45'],
        type: 'solid'
      }
    }
  }],
  xAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#313b45'
      }
    },
    axisLabel: {
      // formatter(value) {
      //   return humansize(Math.abs(value));
      // },
      color: '#fff',
      fontSize: 14,
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: ['#313b45'],
        type: 'solid'
      }
    }
  }],
  series: [
    {
      name: 'Attack Count',
      type: 'bar',
      barWidth: '20px',
      data: data.map(item => item.num),
      itemStyle: {
        color: '#1e7ed3',
      },
    }, 
  ]
});
export default class BlockTimeTop5 extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  static defaultProps = {
    config: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {ip: [], domain: []},
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
      const data = datasource ? datasource.formated_content : {ip:[],domain:[]};
      this.setState({
        data: data && Object.keys(data).length > 0 && data['ip'].length > 0 ? data : this.exampleData
      });
    }
  }
  render() {
    const { data } = this.state;
    const { config } = this.props;
    return (
      <YJFDLayout>
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '封堵时常TOP5'}</span>
          </div>
          <div className={classes.content}>
            <div className={classes.topItem}>
              <div className={classes.ipname}>IP:</div>
              {data.ip.length === 0 && (
                <div className={classes.noData}>
                  <div>
                    <Icon className={classes.noDataIcon} type="exclamation-circle" />
                    <span>暂无数据</span>
                  </div>
                </div>
              )}
              {data.ip.length > 0 && 
                <ReactEcharts
                  notMerge
                  lazyUpdate
                  theme="ads_cloud"
                  style={{ width: 450, height: 220 }}
                  option={getOption1(data.ip || [])}
                />}
              </div>
              <div className={classes.bottomItem}>
               <div className={classes.ipname}>域名:</div>
                {data.domain.length === 0 && (
                  <div className={classes.noData}>
                    <div>
                      <Icon className={classes.noDataIcon} type="exclamation-circle" />
                      <span>暂无数据</span>
                    </div>
                  </div>
                )}
                {data.domain.length > 0 &&
                  <ReactEcharts
                    notMerge
                    lazyUpdate
                    theme="ads_cloud"
                    style={{ width: 450, height: 220 }}
                    option={getOption2(data.domain || [])}
                  />}
              </div>
            </div>
      </div>

      </YJFDLayout>
    );
  }
}
