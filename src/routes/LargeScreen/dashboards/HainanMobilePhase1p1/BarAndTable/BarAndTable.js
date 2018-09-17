import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { humansize } from 'helpers/unitHelper';
import PanelLayout from 'layouts/HN1PanelLayout';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './BarAndTable.scss';

const exampleData = {
  table: {
    headText: '蠕虫名称',
    valueText: '感染主机数'
  },
  data: [{
    name: '网络蠕虫',
    value: 16
  }, {
    name: '永恒之蓝',
    value: 13
  }, {
    name: '莫里斯蠕虫',
    value: 10
  }, {
    name: '苏拉病毒',
    value: 7
  }, {
    name: '主机蠕虫',
    value: 6
  }]
};

const client = new ApiClient();

const getOption = data => ({
  title: {
    show: false
  },
  grid: {
    left: '20%'
  },
  tooltip: {
    show: false
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
    data: data.map(item => item.name),
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, .5)',
      fontSize: 13,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#2e4368'
      }
    }
  }],
  xAxis: [{
    type: 'value',
    position: 'top',
    max: Math.max(...(data.map(item => item.value))),
    axisLine: {
      show: false
    },
    axisLabel: {
      formatter(value) {
        return humansize(Math.abs(value));
      },
      color: 'rgba(255, 255, 255, .5)',
      fontSize: 13,
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  }],
  series: [{
    type: 'bar',
    barWidth: 15,
    silent: true,
    barGap: '-100%',
    data: data.map(() => Math.max(...(data.map(item => item.value)))),
    itemStyle: {
      color: 'rgba(255,255,255,.05)',
      borderColor: 'rgba(255,255,255,.05)',
      barBorderRadius: 2
    }
  }, {
    type: 'bar',
    barWidth: 15,
    data: data.map(item => item.value),
    z: 10,
    itemStyle: {
      color: '#35e5ff',
      borderColor: '#35e5ff',
      barBorderRadius: 2
    },
  }]
});

export default class BarAndTable extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  static defaultProps = {
    config: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      top: 0,
      direction: 'up'
    };
    this.requests = [];
    this.exampleData = exampleData;
    this.loadData = this.loadData.bind(this);
    this.setTop = this.setTop.bind(this);
  }

  componentDidMount() {
    const { config } = this.props;
    const refresh_interval = config ? config.refresh_interval || 60000 : 60000;
    this.loadData();
    this.timer = setInterval(() => this.loadData(), refresh_interval);
    this.tableTimer = setInterval(() => this.setTop(), 5000);
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
    if (this.tableTimer) {
      clearInterval(this.tableTimer);
    }
  }

  setTop() {
    const { top, data, direction } = this.state;
    const tableData = cloneDeep(data).data || [];
    let unitLength = 132;
    if (tableData.length > 2) {
      if (direction === 'up') {
        if ((tableData.length - 2) * 66 - top === 66) {
          unitLength = 66;
        }
        this.setState({ top: top + unitLength, direction: top + unitLength === (tableData.length - 2) * 66 ? 'down' : 'up' });
      } else {
        if (tableData.length % 2 === 1 && (tableData.length - 2) * 66 === top) {
          unitLength = 66;
        }
        this.setState({ top: top - unitLength, direction: top - unitLength === 0 ? 'up' : 'down' });
      }
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

  render() {
    const { data, top } = this.state;
    const { config } = this.props;
    const chartData = (cloneDeep(data).data || [])
      .sort((a, b) => b.value - a.value)
      .slice(0, 5).reverse();
    const tableData = cloneDeep(data).data || [];
    const tableTitle = cloneDeep(data).table || { headText: '蠕虫名称', valueText: '感染主机数' };
    return (
      <PanelLayout title={config && config.title ? config.title : '蠕虫事件'}>
        <div className={classes.container}>
          {tableData.length === 0 && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          {tableData.length > 0 && (
            <div>
              <ReactEcharts
                notMerge
                lazyUpdate
                theme="ads_cloud"
                style={{ width: 530, height: 340 }}
                option={getOption(chartData)}
              />
              <div className={classes.tableArea}>
                <div className={classes.table}>
                  <div className={classes.tableTitle}>
                    <span>{tableTitle.headText}</span>
                    <span>{tableTitle.valueText}</span>
                  </div>
                  <div className={classes.tableBody}>
                    <div className={classes.tableDisplay} style={{ top: `${-top}px` }}>
                      {tableData.map(item => (
                        <div key={item.name} className={classes.tableItem}>
                          <span className={classes.itemName}>{item.name}</span>
                          <span className={classes.itemValue}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </PanelLayout>
    );
  }
}
