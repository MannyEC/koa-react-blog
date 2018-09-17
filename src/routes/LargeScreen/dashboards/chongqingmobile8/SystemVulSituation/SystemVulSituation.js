import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './SystemVulSituation.scss';

const client = new ApiClient();

const exampleData = {
  legendData: ['低危', '中危', '高危'],
  xAxisData: ['10.66.10.11','22.12.3.12','1.45.2.2.5','23.12.3.1','8.65.3.2','122.24.5.6','12.4.6.32'],
  seriesData: [
    {
        name: '低危',
        type: 'bar',
        stack: '事件数',
        barMaxWidth: '20px',
        data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
        name: '中危',
        type: 'bar',
        stack: '事件数',
        barMaxWidth: '20px',
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: '高危',
        type: 'bar',
        stack: '事件数',
        barMaxWidth: '20px',
        data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
};

const getOption = (data) => ({
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        right: 0,
        data: data.legendData,
        textStyle: {
          color: '#fff',
          fontSize: '12'
        },
        itemWidth: 10,
        itemHeight: 10
    },
    color: ['#8bffa3', '#faa058', '#e95a4b'],
    grid: {
        show: true,
        top: '30px',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true,
        borderColor: '#e5e5e5',
        borderWidth: 0,
    },
    yAxis:  {
        type: 'value',
        splitLine: {
          show:true,
          lineStyle: {
              color: ['#0c3758']
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: { color: '#fff' },
        }
    },
    xAxis: {
        splitLine: {
          show:true,
          lineStyle: {
              color: ['#0c3758']
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: { color: '#fff' },
        },
        type: 'category',
        data: data.xAxisData
    },
     series: data.seriesData
});
export default class SystemVulSituation extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  static defaultProps = {
    config: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {legendData: [], xAxisData: [], seriesData: []}
    };
    this.requests = [];
    this.exampleData = exampleData;
  }

  componentDidMount() {
    const { config } = this.props;
    const refresh_interval = config ? config.refresh_interval || 6000 : 6000;
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

  // 销毁定时器
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
      const data = datasource ? datasource.formated_content : {legendData: [], xAxisData: [], seriesData: []};
      this.setState({
        data: data && data.legendData > 0 ? data : this.exampleData
      });
    }
  }
  render() {
    const { data } = this.state;
    const { config } = this.props;
    return (
        <div className={classes.container}>        
          <div className={classes.divisionTop}>
          </div>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '入侵事件态势'}</span>
          </div>
          <div className={classes.content}>
            {data.legendData.length === 0  && (
              <div className={classes.noData}>
                <div>
                  <Icon className={classes.noDataIcon} type="exclamation-circle" />
                  <span>暂无数据</span>
                </div>
              </div>
            )}
            {data.legendData.length > 0 &&
              <ReactEcharts
                notMerge
                lazyUpdate
                theme="ads_cloud"
                style={{ width: '100%', height: '100%' }}
                option={getOption(data)}
              />
            }
          </div> 
        </div>
    );
  }
}
