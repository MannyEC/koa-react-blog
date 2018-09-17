import React, { Component } from 'react';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Layout, Button, Icon } from 'antd';
import moment from 'moment';
import Progress from 'components/Progress';

import classes from './Deploy.scss';

const { Content } = Layout;
const BreadcrumbItem = Breadcrumb.Item;

const checkWaiting = item =>
  item.release && item.release.state === 'RELEASE_STATE_WAITING';

const checkDoing = item =>
  item.release && item.release.state === 'RELEASE_STATE_DOING';

const checkFailed = item =>
  item.release && item.release.state === 'RELEASE_STATE_FAILED';

const checkSuccess = item =>
  item.release && item.release.state === 'RELEASE_STATE_SUCCESS';

const getPercent = (release) => {
  let percent = 0;
  const originPercent = release
    ? (moment().unix() - moment(release.state_time).unix()) / 30 * 100
    : 0;
  if (originPercent >= 0 && originPercent < 99) {
    percent = Math.floor(originPercent);
  } else if (originPercent < 0) {
    percent = 0;
  } else {
    percent = 99;
  }
  return percent;
};

const getWaitTime = (release) => {
  if (release && moment() >= moment(release.state_time)) {
    return moment().unix() - moment(release.state_time).unix();
  }
  return 0;
}

export default class Deploy extends Component {
  static propTypes = {
    match: PropTypes.object,
    dashboard: PropTypes.object,
    push: PropTypes.func,
    loadDashboard: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.props.loadDashboard(this.props.dashboard.id), 5000);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.dashboard, nextProps.dashboard)) {
      const { dashboard: { release }, push } = nextProps;
      if (release && release.state === 'RELEASE_STATE_SUCCESS') {
        if (this.timer) {
          clearInterval(this.timer);
        }
        setTimeout(() => push('/main/dashboards'), 3000);
      }
      if (this.waitTimer) {
        clearInterval(this.waitTimer);
      }
      if (release && release.state === 'RELEASE_STATE_WAITING') {
        const timer = getWaitTime(release);
        this.setState({ timer });
        this.waitTimer = setInterval(() => this.setState({
          timer: getWaitTime(release)
        }));
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.waitTimer) {
      clearInterval(this.waitTimer);
    }
  }

  render() {
    const { dashboard, match, push } = this.props;
    const { editKey } = match.params;
    const { release } = dashboard;
    const wait = release ? release.queue_position || 1 : 1;

    return (
      <Layout style={{ minHeight: '100%' }}>
        <Content>
          <div className={classes.header}>
            <Breadcrumb className={classes.breadcrumb}>
              <BreadcrumbItem>
                <Link className={classes.breadcrumb} to="/main/dashboards">
                  我的仪表盘
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span style={{ color: '#fff' }}>
                  {dashboard.name}
                </span>
              </BreadcrumbItem>
            </Breadcrumb>
            <Link to={`/largescreen/show/${editKey}`}>
              <Icon
                type="edit"
                className={classes.editIcon}
              />
            </Link>
            <Button
              type="primary"
              size="large"
              className={classes.returnButton}
              onClick={() => push(`/largescreen/show/${editKey}`)}
            >
              返回
            </Button>
          </div>
          <div
            className={classes.container}
          >
            {checkWaiting(dashboard) && <div className={classes.cover}>
              <div className={classes.coverText}>
                当前排在
                <span className={classes.rank}>{wait}</span>
                号，预计还需等待
                <span className={classes.time}>{Math.ceil(wait * 20 / 60)}</span>
                分钟
              </div>
              <Progress
                size={320}
                loading
              >
                <div className={classes.progress}>
                  <div className={classes.progressHeader}>已等待</div>
                  <div className={classes.timer}>
                    {moment(this.state.timer * 1000).format('mm:ss')}
                  </div>
                  <div className={classes.progressText}>
                    正在为您排队，请耐心等待...
                  </div>
                </div>
              </Progress>
            </div>}
            {checkDoing(dashboard) && (
              <div
                className={classes.cover}
              >
                <div className={classes.coverText}>
                  正在为您发布大屏
                </div>
                <Progress
                  size={320}
                  percent={getPercent(release)}
                >
                  <div className={classes.progress}>
                    <div className={classes.progressHeader} />
                    <div className={classes.percent}>
                      {getPercent(release)}
                      <span className={classes.sign}>%</span>
                    </div>
                    <div className={classes.progressText}>
                      发布中，请耐心等待...
                    </div>
                  </div>
                </Progress>
              </div>
            )}
            {checkFailed(dashboard) && (
              <div>
                发布失败，请返回
              </div>
            )}
            {checkSuccess(dashboard) && (
              <div>
                发布成功，返回我的仪表盘预览或下载代码
              </div>
            )}
          </div>
        </Content>
      </Layout>
    );
  }
}
