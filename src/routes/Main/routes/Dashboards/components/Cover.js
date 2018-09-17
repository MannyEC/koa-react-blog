import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import Progress from 'components/Progress';
import classes from './Cover.scss';

const checkWaiting = item =>
  item.release && item.release.state === 'RELEASE_STATE_WAITING';

const checkDoing = item =>
  item.release && item.release.state === 'RELEASE_STATE_DOING';

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

const Cover = (props) => {
  const { dashboard } = props;
  const { release } = dashboard;
  const wait = release ? release.queue_position || 1 : 1;
  return (
    <div className={classes.container} >
      <Link to={`/largescreen/show/${dashboard.id}`}>
        <div className={classes.imageCover}>
          <img src={dashboard.template.thumb} alt="缩略图" />
        </div>
      </Link>
      {checkWaiting(dashboard) && <div className={classes.cover}>
        发布排队中，预计还需等待<span className={classes.time}>{Math.ceil(wait * 15 / 60)}</span>分钟
      </div>}
      {checkDoing(dashboard) && (
        <div
          className={classNames({
            [classes.cover]: true,
            [classes.coverColumn]: true
          })}
        >
          <Progress
            size={130}
            percent={getPercent(release)}
          >
            <span className={classes.percent}>
              {getPercent(release)}
              <span className={classes.sign}>%</span>
            </span>
          </Progress>
          <div className={classes.doningText}>
            发布中，请耐心等待...
          </div>
        </div>
      )}
    </div>
  );
};

Cover.propTypes = {
  dashboard: PropTypes.object
};

export default Cover;
