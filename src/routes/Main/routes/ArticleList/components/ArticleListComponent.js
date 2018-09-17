import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Icon } from 'antd';
import classNames from 'classnames';
import Progress from 'components/Progress';
import classes from './ArticleList.scss';

class ArticleList extends Component {

  render() {
    return (
      <div className={classes.articleList}>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Link to={'/main/article/'}>
              <Icon type="right" theme="outlined" />
            </Link>
          </div>
        </div>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Icon type="right" theme="outlined" />
          </div>
        </div>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Icon type="right" theme="outlined" />
          </div>
        </div>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Icon type="right" theme="outlined" />
          </div>
        </div>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Icon type="right" theme="outlined" />
          </div>
        </div>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Icon type="right" theme="outlined" />
          </div>
        </div>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Icon type="right" theme="outlined" />
          </div>
        </div>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Icon type="right" theme="outlined" />
          </div>
        </div>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Icon type="right" theme="outlined" />
          </div>
        </div>
        <div className={classes.articleCard}>
          <div className={classes.articleCardDoc}>
            <header className={classes.articleCardHeader}>
              SlowHTTPtest 慢速连接攻击及解决
            </header>
            <div className={classes.articleCardContent}>
              slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时
              如果使用虚拟机，可能遇到构建有效连接数很少的情况
              大部分的连接都会被pending和closed。所以最好在实体机上运行。
            </div>
            <div className={classes.articleCardTime}>
              2018-09-15
            </div>
          </div>
          <div className={classes.articleCardLink}>
            <Icon type="right" theme="outlined" />
          </div>
        </div>
      </div>
    );
  }
}


export default ArticleList;
