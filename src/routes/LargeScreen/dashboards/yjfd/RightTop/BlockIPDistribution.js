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
import label from './label.png';
require("echarts/map/js/world.js");
import classes from './BlockIPDistribution.scss';

const client = new ApiClient();
const exampleData = [
  {name: 'Amsterdam', value: [4.895168,52.370216,50]},
  {name: 'Athens', value: [-83.357567,33.951935,85]},
  {name: 'Beijing', value: [116.407395,39.904211,100] }
];

const  max = 200, min = 9;
const maxSize4Pin = 300, minSize4Pin = 20;
const getOption = (data) => ({
        tooltip: {
          trigger: 'item',
          padding:10,
          formatter: function (data) {
              if(typeof(data.value)[2] == "undefined"){
                return data.name + data.value;
              }else{
                return data.name + ' <br/>共封堵IP：' + data.value[2];
              }
          },
          textStyle:{
            color:'#fff',
            fontSize:22,
          }
        },
        geo: {
            map: 'world',
            left: 20,
            right: 20,
            top: 10,
            bottom: 10,
            roam: true,
            silent: true,
            layoutCenter:['45%','50%'],
            layoutSize:1000,
            itemStyle: {
              normal: {
                areaColor: 'rgba(145,155,162,0.7)',
                borderColor: 'rgba(145,155,162,0.7)'
              },
              emphasis: {
                 areaColor: '#2a333d',
                  label: {
                      show: false
                  }
              }
            }
        },
        series: [{
            type: 'map',
            data: data

        },
        {
            name: '气泡',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: function (val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a*min;
                b = maxSize4Pin - a*max;
                return a*val[2]+b;
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                    },
                    formatter:function(data){
                        return data.value[2]
                      }
                },
                
            },
            itemStyle: {
                normal: {
                    color: '#1e88e5', //标志颜色
                }
            },
            zlevel: 6,
            data: data
        },
         {
            name: '点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbol:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEJFQjVFRkQ5OTI4MTFFOEI5MDVCOEU4QzBCRTdBREEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEJFQjVFRkU5OTI4MTFFOEI5MDVCOEU4QzBCRTdBREEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QkVCNUVGQjk5MjgxMUU4QjkwNUI4RThDMEJFN0FEQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QkVCNUVGQzk5MjgxMUU4QjkwNUI4RThDMEJFN0FEQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoGnCSkAAAR9SURBVHja1Jh9aI1RHMevjbpmRmRt3odtKKx5jcnL/hAS/pF35o8xlpAoS3lpSKK8v5W3ifhHSigmwpBsLHMxF5kmq2VzvdQd1/dX36dOT+fxnGe7tJ36dO85z3nO+T3n/H6/8/udVpFIxNfcS4yvBZTW1p8PyW2alWA9qsMtdCUbWXqDQfxNAu1AW/ADfAOfwDtQzt//JqToxRiQDX5TgDugGnylgCJoe5AMUkEOd60Y3AVhLxO2sqzbUCeHgNnSHVwHbzzM1RdMAt3BBVBmqpOmQramcOmgCLxsgorIGPM5xnnQEA0h/WA5+A5Ogp9RsAUZczGIAwd1Y3qxblnBPFADjkRJQB/HOcpx89xsw20lZVsSwGEaidP2TQUZtPCO4AstW/Tuyl/UQxZpKQ2uyGkl//YFGRSg0EFAMYDVoD+4DHaDjxRQBO0BstgeAHtAlW0MGfcEKOB8ZV6ORVnWWfw63RaPpn6WgulUhTJuX5i/T8BePi9l/9EOW3+G87XxIuQYfrVum8aBLSCfH9Hgon8N7JfP98Zp+rzifFlehMymH7SXnmAztzmgtI8Ah7h67/l7iO1WCfA9eb+XZuxrYKKpkCkg4uCo14PjPGUsnd4GDoASMA30428J27cp21jO99dpxg5SR1NMhBwInmraB4A+dMBW2cFzewI4TcMJ8/c02+X5duWdcxxngGaOZ5zfVUgZoFLTPgVcUnRwOHVoGQg5qE2Iz8eyv5RfHGeypn8l53cVMonBgu7cfqjUc7id9S6GU89+S5Q2UYVhmr7VnN9VyHiHiZNsfk48wE1bn0I65kJbu/QbpdTFuLo5fFC8iZB+B9/YGdQp9S70h2pZy0lW2to/g05KvY4nmc5n+k2E1HakfnVQ6jUUVC27GOzutbUnglql3sFht7QLFOMgjO4rq3gUWuU+/alaCriSBRq/+0Cp96IHsJcEnRHqhPzEiNpexEGPVOonGMLFuRiOROgr2N8qop+PNX2TOb+rkEE6ZHu5CmaAWNYfMR04plN2xQglgrrB/j6+P5MnjC56D5oIWUF3o2uXAeYobZtoqSLsAtCVp0tX1ov5fJPyzmyOU+Hg5ipMErG3Emfyq+xH405wiidSOU+XDXTO4jfX0IprqYP5ygr6mFnmgoUOh0gM5zcKesfzeDroEAVtpAABD9G4xJ37wVZwW/Nc9PsFuGWaPtyjJadrnt1Wgop5BmmxPJ+rBBs6AdM4310voVqYaed8B58purYIZDIqlxRgMF1IDP1nJp26PB/K/sUOvnEB5ws3NseJZ9LkluMM42q059FYRTfjluPk0jcWNTalla1aRd91lnFmNG/05jEm2GOP8L2ktA1U9kRuqT9KAvq5gqIW+9xSEJNbtZ88i0M87tKaKGAaxwlxXNdc3vTCykqmMnjzYN0FBT0I14d3QZLqXmQG+U8urKx0N4tBwy+G/K+pt/VKFJVAfUul5ccyrjS6VWvMhZXp/WS8Em6FlPvJ5zxJjA3P9AbDpLxryuWo5+1uzqVF3Jm3CCH/CDAACe9Mtm66YjAAAAAASUVORK5CYII=',
            rippleEffect:{
                scale:2.5,
                brushType:'stroke'
            },
            data: data,
            symbolSize: function (val) {
                return (val[2]-20)/2;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                    },
                },
            },
            itemStyle: {
                normal: {
                    color: '#05C3F9',
                    shadowBlur: 10,
                    shadowColor: '#05C3F9'
                }
            },
            zlevel: 1
        },
      
        ]
   
});
export default class BlockIPDistribution extends Component {
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
      // currentUnit: 'bps'
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
    // const chartData = cloneDeep(data).reverse();
    return (
      <YJFDLayout>
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '封堵IP分布'}</span>
          </div>
          {data.length === 0 && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          {data.length > 0 && <div className={classes.content}>
            <ReactEcharts
              notMerge
              lazyUpdate
              theme="ads_cloud"
              style={{ width: 1400, height: 600 }}
              option={getOption(data)}
            />
          </div>
          }
        </div>
      </YJFDLayout>
    );
  }
}
