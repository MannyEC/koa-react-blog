import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Icon } from 'antd';
import YJFDLayout from 'layouts/LargeScreenLayout/YJFDLayout';
import classNames from 'classnames';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './BlockRealDomain.scss';

const client = new ApiClient();
const exampleData = [
    { domain: '1.1.111.1', blocktime: '2017-05-01 12:00',duration:'24h', unblocktime:'2017-05-02 11:00',operation:'停止'},
    { domain: '1.1.112.2', blocktime: '2017-05-01 12:00',duration:'24h', unblocktime:'2017-05-02 11:00',operation:'停止'},
    { domain: '1.1.113.3', blocktime: '2017-05-01 12:00',duration:'24h', unblocktime:'2017-05-02 11:00',operation:'停止'},
    { domain: '1.1.114.4', blocktime: '2017-05-01 12:00',duration:'24h', unblocktime:'2017-05-02 11:00',operation:'停止'},
    { domain: '1.1.115.5', blocktime: '2017-05-01 12:00',duration:'24h', unblocktime:'2017-05-02 11:00',operation:'停止'},
];
export default class BlockRealDomain extends Component {
  static propTypes = {
    config: PropTypes.object,
  }
  static defaultProps = {
    config: {}
  }
  constructor(props) {
    super(props);
    this.state = {
      data:[]
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

 loadData(props){
  const { config:{ datasource_type,datasource,datasource_url } } = props || this.props;
  if(datasource_type !== 'STATIC' && datasource_url) {
    if(this.request.length){
      this.request.forEach(request => request.cancel());
      this.requests = [];
    }
    this.divertRequest = makeCancelable(client.get(datasource_url));
    this.requests.push(this.divertRequest);
    this.divertRequest.promise.then((response) => {
        this.setState({
          data: response
        });
    }); 
  } else{ 
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
      <YJFDLayout>
        <div className={classes.container}>
          {<div className={classes.header}>
          {  <span>{config && config.title ? config.title : '实时封堵域名'}</span>}
          </div>}
          {data.length === 0 && (
             <div className={classes.noData}>
                <div>
                   <Icon className={classes.noDataIcon} type="exclamation-circle" />
                   <span>暂无数据 </span>
                </div>
             </div>
          )}
          {data.length > 0 && <div className={classes.content}>
            <table className={classes.iptable}  border="0">
               <thead>
                  <tr>
                    <th>域名</th>
                    <th>封堵时间</th>
                    <th>持续时长</th>
                    <th>解封时间</th>
                    <th>操作</th>
                  </tr>
               </thead>
               <tbody>
                {data.map((item,idx) => (
                  <tr key={item.domain}>
                   <td>{item.domain}</td>
                   <td>{item.blocktime}</td>
                   <td>{item.duration}</td>
                   <td>{item.unblocktime}</td>
                   <td>{item.operation}</td>
                 </tr>
                ))}
               </tbody>
            </table>
          </div>
        }
        </div>
      </YJFDLayout>
    );
  }
}
