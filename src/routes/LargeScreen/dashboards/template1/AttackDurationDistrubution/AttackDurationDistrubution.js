import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import ReactEcharts from 'echarts-for-react';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import classes from './AttackDurationDistrubution.scss';

const client = new ApiClient();

const exampleData = [{
  '30mi': 10,
  '60mi': 20,
  '5mi': 30,
  other: 40
}];

export default class AttackDurationDistrubution extends Component {
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
    this.getOption = this.getOption.bind(this);
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

  getOption = () => {
    const data = this.state.data[0] || {};
    return {
      title: {
        show: false
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      color: ['#00cff6', '#00bd7a', '#ffb331', '#ffa68c'],
      legend: {
        orient: 'vertical',
        right: 120,
        y: 'center',
        align: 'left',
        formatter(name) {
          return `{a|${name}}`;
        },
        data: ['<5分钟', '5~30分钟', '30分钟~1小时', '>1小时'],
        textStyle: {
          color: 'rgba(255, 255, 255, 1)',
          width: 200,
          lineHeight: 40,
          rich: {
            a: {
              width: 100,
              lineHeight: 35,
            }
          }
        }
      },
      toolbox: {
        show: false
      },
      calculable: !0,
      series: [{
        name: 'Attack refresh_interval',
        type: 'pie',
        center: ['30%', '45%'],
        radius: ['20%', '75%'],
        roseType: 'radius',
        label: {
          normal: {
            show: false,
            formatter: '{b} ({d}%)',
            position: 'insideTopRight'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: data['5mi'],
          name: '<5分钟'
        }, {
          value: data['30mi'],
          name: '5~30分钟'
        }, {
          value: data['60mi'],
          name: '30分钟~1小时'
        }, {
          value: data.other,
          name: '>1小时'
        }]
      }]
    };
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
        data: data && data.length > 0 ? data : this.exampleData
      });
    }
  }

  render() {
    const { config } = this.props;
    return (
      <PanelLayout>
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '攻击时长分布'}</span>
          </div>
          <ReactEcharts
            notMerge
            lazyUpdate
            theme="ads_cloud"
            style={{ width: 690, height: 270 }}
            option={this.getOption()}
          />
        </div>
      </PanelLayout>
    );
  }
}
