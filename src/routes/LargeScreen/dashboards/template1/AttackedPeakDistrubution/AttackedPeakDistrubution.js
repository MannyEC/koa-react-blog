import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import ReactEcharts from 'echarts-for-react';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import classes from './AttackedPeakDistrubution.scss';

const client = new ApiClient();

const exampleData = [{
  '100g': 10,
  '10g': 20,
  '1g': 30,
  other: 40
}];

export default class AttackedPeakDistrubution extends Component {
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
    const total = parseInt(data['1g'], 10) + parseInt(data['10g'], 10) + parseInt(data['100g'], 10) + parseInt(data.other, 10);
    const percent = total === 0 ? [0, 0, 0, 0]
      : [
        (parseInt(data['1g'], 10) * 100 / total).toFixed(1),
        (parseInt(data['10g'], 10) * 100 / total).toFixed(1),
        (parseInt(data['100g'], 10) * 100 / total).toFixed(1),
        (parseInt(data.other, 10) * 100 / total).toFixed(1)
      ];
    return {
      title: {
        show: false
      },
      color: ['#00cff6', '#00bd7a', '#ffb331', '#ffa68c'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} 数值: {c}'
      },
      legend: {
        show: false
      },
      series: [
        {
          name: 'Attack Peak Distrubution',
          type: 'pie',
          radius: ['52%', '66%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          label: {
            normal: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true,
              length1: 20,
              length2: 40
            }
          },
          data: [
            { value: data['1g'], name: `<1G  ${percent[0]}%` },
            { value: data['10g'], name: `1G~10G  ${percent[1]}%` },
            { value: data['100g'], name: `10G~100G  ${percent[2]}%` },
            { value: data.other, name: `>100G  ${percent[3]}%` }
          ]
        }
      ]
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
            <span>{config && config.title ? config.title : '被攻击峰值占比'}</span>
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
