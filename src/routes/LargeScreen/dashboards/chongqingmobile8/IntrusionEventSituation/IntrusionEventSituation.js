import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './IntrusionEventSituation.scss';

const exampleData = {
  sip: [
    {sip: '10.10.10.10', sarea: '北京', times: 100},
    {sip: '10.10.10.11', sarea: '重庆', times: 23},
    {sip: '22.10.26.107', sarea: '武汉', times: 300},
    {sip: '110.12.103.10', sarea: '上海', times: 125},
    {sip: '109.10.10.4', sarea: '济南', times: 55}
  ],
  dip: [
    {dip: '192.168.1.5', times: 200},
    {dip: '192.168.1.3', times: 230},
    {dip: '192.168.1.4', times: 44},
    {dip: '192.168.1.1', times: 100},
    {dip: '192.168.1.8', times: 250}
  ]
};

const client = new ApiClient();

export default class IntrusionEventSituation extends Component {
  static propTypes = {
    config: PropTypes.object,
  }

  static defaultProps = {
    config: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {sip: [], dip: []}
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
      const data = datasource ? datasource.formated_content : {sip: [], dip: []};
      this.setState({
        data: data && Object.keys(data).length > 0 && data['sip'].length > 0 ? data : this.exampleData
      });
    }
  }
  render() {
    const { data } = this.state;
    const { config } = this.props;
    return (
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '入侵事件态势'}</span>
          </div>
          <div className={classes.content}>
            <div className={classes.leftItem}>
              <span className={classes.itemTitle}>源IP</span>
              <div className={classes.itemCon}>
                { data.sip.length === 0 && (
                  <div className={classes.noData}>
                    <div>
                      <Icon className={classes.noDataIcon} type="exclamation-circle" />
                      <span>暂无数据</span>
                    </div>
                  </div>
                )}                
                { data.sip.length > 0 &&
                  <div className={classes.items}>
                    {
                      data.sip.map((item, idx) => (                        
                        <div style={{height: '24px'}} key={item.sip}>
                          <div className={classes.processText}>
                            <span>{item.sip}<span style={{marginLeft: '5px'}}>{item.sarea}</span></span>
                            <span>{item.times}次</span>
                          </div>
                          <div className={classes.process}>
                            <div className={classes.processBar} style={{width: item.times / 500 * 100 + '%' }}>
                            </div>
                          </div>
                        </div>
                      )                 
                    )}
                  </div>
                }
              </div>
            </div>
            <div className={classes.middleItem}>
            </div>
            <div className={classes.rightItem}>
              <span className={classes.itemTitle}>目的IP</span>
              <div className={classes.itemCon}>
                {  data.dip.length === 0 && (
                  <div className={classes.noData}>
                    <div>
                      <Icon className={classes.noDataIcon} type="exclamation-circle" />
                      <span>暂无数据</span>
                    </div>
                  </div>
                )}                
                { data.dip.length > 0 &&
                  <div className={classes.items}>
                    {
                      data.dip.map((item, idx) => (                        
                        <div style={{height: '24px'}} key={item.dip}>
                          <div className={classes.processText}>
                            <span>{item.dip}  {item.sarea}</span>
                            <span>{item.times}次</span>
                          </div>
                          <div className={classes.process}>
                            <div className={classes.processBar} style={{width: item.times / 500 * 100 + '%' }}>
                            </div>
                          </div>
                        </div>
                      )                 
                    )}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
    );
  }
}
