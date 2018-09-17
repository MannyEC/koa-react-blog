import React, { Component } from 'react';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import classnames from 'classnames';
import ApiClient from 'helpers/ApiClient';
import makeCancelable from 'helpers/PromiseHelper';
import classes from './AssetAllocation.scss';
import { draw } from './background';

const exampleData = [{
  name: 'SYN　FLOOD',
  count: 15,
}, {
  name: 'UDP　FLOOD',
  count: 29
}, {
  name: 'TCP　FLOOD',
  count: 6
}, {
  name: 'ACK　FLOOD',
  count: 33
}, {
  name: 'TRAFFIC',
  count: 34
}, {
  name: '其他',
  count: 10
}];

const client = new ApiClient();

// [x1, y1, x2, y2]
const svgLines = {
  left: [
    [90, 30, 50, 10],
    [60, 100, 10, 100],
    [90, 170, 50, 200],
  ],
  right: [
    [10, 30, 50, 10],
    [40, 100, 90, 100],
    [10, 170, 50, 200],
  ],
};

const HexagonItem = (props) => {
  const { name, count } = props.data;
  return (
    <div
      className={classnames({
        [classes.hexagon]: true,
        [props.className]: true,
      })}
    >
      <div className={classes.hexagonLabel}>
        <div className={classes.hexagonLabelNum}>{count}</div>
        <div className={classes.hexagonLabelTitle}>{name}</div>
      </div>
      <svg width="70" height="60" xmlns="http://www.w3.org/2000/svg">
        <polygon
          fill="none"
          points="20,2 50,2 65,27 50,52 20,52 5,27 20,2"
          stroke="#00e4ff"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

const svgPath = (position) => {
  return (
    <path
      stroke="#00e4ff"
      d={`M${position[0]} ${position[1]} L${position[2]} ${position[3]} Z`}
    />
  );
};

const SvgLineSet = (props) => {
  const { data } = props;
  const paths = [];
  data.forEach((item) => {
    paths.push(svgPath(item));
  });
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
      {paths}
    </svg>
  );
};


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

  drawCanvas = (canvas) => {
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    draw(ctx);
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
    let sum = 0;
    data.forEach((item) => {
      sum += item.count;
    });

    return (
      <div>
        <div className={classes.container}>
          <div className={classes.header}>
            <span>{config && config.title ? config.title : '资产类型分布'}</span>
          </div>
          {isEmpty(data) && (
            <div className={classes.noData}>
              <div>
                <Icon className={classes.noDataIcon} type="exclamation-circle" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
          {!isEmpty(data) && (
            <div>
              <div className={classes.midLabel}>
                <div>{sum}</div>
                <div>总数</div>
              </div>
              <div className={classes.svgLineLeft}>
                <SvgLineSet data={svgLines.left} />
              </div>
              <div className={classes.svgLineRight}>
                <SvgLineSet data={svgLines.right} />
              </div>
              <HexagonItem className={classes.hexagonTopL} data={data[0]} />
              <HexagonItem className={classes.hexagonTopR} data={data[1]} />
              <HexagonItem className={classes.hexagonMidL} data={data[2]} />
              <HexagonItem className={classes.hexagonMidR} data={data[3]} />
              <HexagonItem className={classes.hexagonBottomL} data={data[4]} />
              <HexagonItem className={classes.hexagonBottomR} data={data[5]} />
              <canvas ref={this.drawCanvas} width={450} height={320} className={classes.assetBg} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
