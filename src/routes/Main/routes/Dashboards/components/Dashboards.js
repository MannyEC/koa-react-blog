import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Layout, Row, Col, Card, Button, Modal, Icon, message } from 'antd';
import copy from 'copy-to-clipboard';
import Cover from './Cover';

import classes from './Dashboards.scss';

const { Content } = Layout;
const { Meta } = Card;
const { confirm } = Modal;

const copyLink = (link, props) => {
  if (link) {
    copy(link);
    message.success('成功复制URL到剪切板');
  } else {
    message.error('仪表盘未部署，无法复制URL');
  }
  props.exportModalSet(false, {});
};

const getTime = (release) => {
  if (release) {
    return moment(release.state_time) < moment().subtract(1, 'days')
      ? moment(release.state_time).format('YYYY-MM-DD HH:mm')
      : moment(release.state_time).fromNow();
  }
  return '从未发布';
};

const checkPreview = item => item.release && item.release.state === 'RELEASE_STATE_SUCCESS';

const checkDownload = item =>
  item.release && item.release.state === 'RELEASE_STATE_SUCCESS' &&
  item.applicable_crowd === 'DEVELOPER';

function Dashboards(props) {
  const {
    dashboards,
    downloadDashboard,
    deleteDashboard,
    exportModalSet,
    modalObject,
    visible,
    deleteVisible,
    deleteObject,
    setDeleteModal,
    downloading
  } = props;
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Content>
        <div className={classes.container}>
          <Modal
            title={<div className={classes.exportTitle}>导出<span>{modalObject.name}</span></div>}
            visible={visible}
            footer={null}
            width={620}
            onCancel={() => exportModalSet(false, {})}
          >
            <div className={classes.modalContainer}>
              <div
                className={classes.actionChoice}
                onClick={() => copyLink(modalObject.url, props)}
              >
                <div className={classes.actionCard}>
                  <Icon type="link" />
                  <div>复制URL</div>
                </div>
              </div>
              <div
                className={classes.actionChoice}
                onClick={() => downloadDashboard(modalObject.id)}
              >
                <div className={classes.actionCard}>
                  {!downloading && <Icon type="cloud-download-o" />}
                  {downloading && <Icon type="loading" />}
                  <div>下载代码</div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            title={<div className={classes.exportTitle}>删除<span>{deleteObject.name}</span></div>}
            visible={deleteVisible}
            footer={[
              <Button
                key="cancel"
                onClick={() => setDeleteModal(false, {})}
              >
                取消
              </Button>,
              <Button
                key="delete"
                className={classes.deleteButton}
                onClick={() => deleteDashboard(deleteObject.id)}
              >
                删除
              </Button>
            ]}
            width={620}
            onCancel={() => setDeleteModal(false, {})}
          >
            <div className={classes.modalContainer}>
              <div className={classes.deleteContent}>您确定要删除这个大屏吗？</div>
            </div>
          </Modal>
          <Row gutter={27.5}>
            <Col span="8">
              <Link to="/main/create/dashboard">
                <Button
                  className={classes.create}
                  icon="plus"
                  type="dashed"
                >
                  创建仪表盘
                </Button>
              </Link>
            </Col>
            {dashboards.map(item => (
              <Col span="8" key={item.id}>
                <Card
                  className={classes.card}
                  cover={<Cover dashboard={item} />}
                  actions={[
                    <span>
                      {checkDownload(item) && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`/api/v1/dashboards/${item.id}/download/?auth_token=${sessionStorage.userToken}`}
                        >
                          下载代码
                        </a>)
                      }
                      {!checkDownload(item) && <span className={classes.disabled}>下载代码</span>}
                    </span>,
                    <span>
                      {checkPreview(item) && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={item.release.release_url}
                        >
                          在线预览
                        </a>)
                      }
                      {!checkPreview(item) && <span className={classes.disabled}>在线预览</span>}
                    </span>,
                    <span
                      className={classes.delete}
                      onClick={() => setDeleteModal(true, item)}
                    >
                      删除
                    </span>
                  ]}
                >
                  <Meta
                    title={item.name}
                    description={(
                      <div className={classes.statTime}>
                        发布时间: {getTime(item.release)}
                      </div>
                    )}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

Dashboards.propTypes = {
  dashboards: PropTypes.array,
  downloadDashboard: PropTypes.func,
  copyDashboard: PropTypes.func,
  deleteDashboard: PropTypes.func,
  exportModalSet: PropTypes.func,
  visible: PropTypes.bool,
  modalObject: PropTypes.object,
  downloading: PropTypes.bool,
  deleteVisible: PropTypes.bool,
  deleteObject: PropTypes.object,
  setDeleteModal: PropTypes.func
};

export default Dashboards;
