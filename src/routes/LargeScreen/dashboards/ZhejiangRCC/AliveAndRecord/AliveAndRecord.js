import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { numberWithCommas } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './AliveAndRecord.scss';

const exampleData = [{
  name: '200类响应码',
  value: 500
}, {
  name: '300类响应码',
  value: 456
}, {
  name: '400类响应码',
  value: 145
}, {
  name: '500类响应码',
  value: 404
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

const getOption = data => ({
  title: {
      show: false,
  },

  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },

  series : [
      {
          name:'访问来源',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data: data,
          roseType: 'radius',
          label: {
              normal: {
                  textStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                  }
              }
          },
          labelLine: {
              normal: {
                  lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
              }
          },
          itemStyle: {
              normal: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
              return Math.random() * 200;
          }
      }
  ]
  // radar: {
  //   indicator: data,
  //   shape: 'circle',
  //   splitNumber: 5,
  //   name: {
  //     textStyle: {
  //       color: '#fff',
  //       fontSize: 18,
  //     }
  //   },
  //   splitLine: {
  //     lineStyle: {
  //       color: [
  //         'rgba(4, 218, 255, 0.1)', 'rgba(4, 218, 255, 0.2)',
  //       ].reverse()
  //     }
  //   },
  //   splitArea: {
  //     show: false
  //   },
  //   axisLine: {
  //     lineStyle: {
  //       color: 'rgba(4, 218, 255, 0.5)'
  //     }
  //   },
  //   axisTick: {
  //     show: true,
  //   }
  // },
  // series: [
  //   {
  //     name: '北京',
  //     type: 'radar',
  //     lineStyle: {
  //       normal: {
  //         width: 1,
  //         opacity: 1
  //       }
  //     },
  //     data: [data.map(item => item.value)],
  //     symbol: 'none',
  //     itemStyle: {
  //       normal: {
  //         color: '#04daff'
  //       }
  //     },
  //     areaStyle: {
  //       normal: {
  //         opacity: 0.1
  //       }
  //     }
  //   }
  // ]
});

export default class AliveAndRecord extends Component {
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
          <div>
            <ReactEcharts
              notMerge
              lazyUpdate
              theme="ads_cloud"
              style={{ width: '100%', height: 350 }}
              option={getOption(data)}
            />
          </div>
        )}
      </div>
    );
  }
}
