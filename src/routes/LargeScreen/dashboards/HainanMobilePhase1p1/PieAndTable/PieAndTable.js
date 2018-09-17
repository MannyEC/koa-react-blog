import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { humansize } from 'helpers/unitHelper';
import PanelLayout from 'layouts/HN1PanelLayout';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './PieAndTable.scss';

const exampleData = {
  pie: [{
    name: '低危',
    value: 36,
    color: '#49ca6a'
  }, {
    name: '轻危',
    value: 14,
    color: '#35e5ff'
  }, {
    name: '中危',
    value: 30,
    color: '#eedb59'
  }, {
    name: '高危',
    value: 12,
    color: '#ee9559'
  }, {
    name: '极危',
    value: 8,
    color: '#ee5959'
  }],
  table: [{
    name: '暗云木马通信',
    data: [{
      name: '主控主机数',
      value: 1
    }, {
      name: '被控主机数',
      value: 4
    }]
  }, {
    name: 'Netcore/Netis路由器',
    data: [{
      name: '主控主机数',
      value: 2
    }, {
      name: '被控主机数',
      value: 7
    }]
  }]
};

const client = new ApiClient();

const getOption = data => ({
  // color: ['rgba(24, 144, 255, .85)', '#FFAB91'],
  legend: {
    show: false
  },
  series: [{
    name: '',
    type: 'pie',
    radius: [0, '30%'],
    label: {
      show: false
    },
    data: [{
      value: 1,
      name: '',
      itemStyle: {
        color: 'rgba(255,255,255,.1)'
      }
    }]
  }, {
    name: '',
    type: 'pie',
    radius: ['55%', '60%'],
    label: {
      show: false
    },
    data: [{
      value: 1,
      name: '',
      itemStyle: {
        color: 'rgba(255,255,255,.1)'
      }
    }]
  }, {
    name: '危险程度',
    type: 'pie',
    radius: ['40%', '50%'],
    data: data.map(item => ({
      ...item,
      itemStyle: {
        color: item.color
      },
      labelLine: {
        length: 30,
        length2: 30
      },
      label: {
        formatter: [
          '{a|{d}%}',
          '{b|{b}}'
        ].join(' '),
        rich: {
          a: {
            color: '#051328',
            fontSize: 18,
            backgroundColor: item.color,
            padding: [2, 4],
            borderRadius: 8
          },
          b: {
            fontSize: 18,
            padding: [16, 8]
          }
        }
      }
    }))
  }]
});

export default class PieAndTable extends Component {
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
    this.loadData = this.loadData.bind(this);
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

  render() {
    const { data } = this.state;
    const { config } = this.props;
    const chartData = cloneDeep(data).pie || [];
    const tableData = cloneDeep(data).table || [];
    return (
      <PanelLayout title={config && config.title ? config.title : '僵尸网络'}>
        <div className={classes.container}>
          {chartData.length === 0 && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          {chartData.length > 0 && (
            <div>
              <ReactEcharts
                notMerge
                lazyUpdate
                theme="ads_cloud"
                style={{ width: 530, height: 340 }}
                option={getOption(chartData)}
              />
              <div className={classes.tableArea}>
                {tableData.map(table => (
                  <div key={table.name} className={classes.table}>
                    <div className={classes.tableTitle}>{table.name}</div>
                    <div className={classes.tableBody}>
                      {table.data.map(item => (
                        <div key={item.name} className={classes.tableItem}>
                          <span className={classes.itemName}>{item.name}</span>
                          <span className={classes.itemValue}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PanelLayout>
    );
  }
}
