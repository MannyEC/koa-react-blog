import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './AssetAllocation.scss';
import { draw } from './background';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-gl';

const exampleData = [{
  name: '僵尸',
  value: 500
}, {
  name: '流量',
  value: 456
}, {
  name: '蠕虫',
  value: 145
}, {
  name: '病毒',
  value: 404
}, {
  name: 'SQL注入',
  value: 404
}, {
  name: '破解',
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
  backgroundColor: '#cdcfd5',
  visualMap: {
      min: 0,
      max: 15,
      realtime: true,
      calculable : true,
      inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
  },
  series: [{
      type: 'map3D',
      map: 'world',
      shading: 'lambert',
      realisticMaterial: {
          roughness: 0.2,
          metalness: 0
      },
      postEffect: {
          enable: true,
          SSAO: {
              enable: true,
              radius: 2,
              intensity: 1
          }
      },
      groundPlane: {
          show: true
      },
      light: {
          main: {
              intensity: 2,
              shadow: true,
              shadowQuality: 'high',
              alpha: 30
          },
          ambient: {
              intensity: 0
          },
          ambientCubemap: {
              texture: '/static/zhejiang-rcc/data.hdr',
              exposure: 1,
              diffuseIntensity: 1
          }
      },
      viewControl: {
          distance: 50
      },
      regionHeight: 1,

      data: data
  }]
});

export default class AssetAllocation extends Component {
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
    this.getMap();
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

  getMap() {
    fetch('/static/zhejiang-rcc/world.json')
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        echarts.registerMap('world', data);
        return fetch('/static/zhejiang-rcc/data.json');
      })
      .then((res)=>{
        return res.json()
      })
      .then(function (data) {
          var regionData = data.map(function (item) {
              return {
                  name: item[0],
                  value: item[1]
              }
          })
          console.log(regionData);

          this.setState({
            data: regionData
          });
      })
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

  drawCanvas = (canvas) => {
    const { data } = this.state;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    draw(ctx, data);
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
      <div>
        <div className="zj-rcc-card">
          {isEmpty(data) && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          {!isEmpty(data) && (
            <div className={classes.itemContainer}>
              <ReactEcharts
                notMerge
                lazyUpdate
                theme="ads_cloud"
                style={{ width: '100%', height: 550 }}
                option={getOption(data)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
