import React, { Component } from 'react';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import PanelLayout from 'layouts/LargeScreenLayout/PanelLayout';
import RadioGroup from 'components/LargeScreenPanels/RadioGroup';
import { humansize } from 'helpers/unitHelper';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './VirusTypeDistrubution.scss';

const exampleData = {
  ip_total_infect_malware_program: 500,
  ip_num_infect_trojan: 500,
  ip_num_infect_worm: 400,
  ip_num_infect_virus: 200,
  ip_num_infect_malware_site: 400
};

const client = new ApiClient();

export default class VirusTypeDistrubution extends Component {
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
    // const chartData = cloneDeep(data).reverse();
    return (
      <div className={classes.container}>
        <div className={classes.topTitle}>
          <div className={classes.topTitleText}>{config && config.title ? config.title : '病毒类型分布'}</div>
        </div>
        <div className={classes.topContent} >
            <div className={classes.troyan}></div>
            <div className={classes.troyanText}>木马感染IP:{data.ip_num_infect_trojan}个</div>
            <div className={classes.virus}></div>
            <div className={classes.virusText}>病毒感染IP:{data.ip_num_infect_virus}个</div>
            <div className={classes.ghost}></div>
            <div className={classes.ghostNum}>{data.ip_total_infect_malware_program}个</div>
            <div className={classes.ghostText}>疑似恶意程序感染IP总数</div>
            <div className={classes.worm}></div>
            <div className={classes.wormText}>蠕虫感染IP:{data.ip_num_infect_worm}个</div>
            <div className={classes.malware}></div>
            <div className={classes.malwareText}>恶意站点感染IP:{data.ip_num_infect_malware_site}个</div>
        </div>
      </div>
    );
  }
}
