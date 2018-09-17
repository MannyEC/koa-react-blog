import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Input, Form, Card, Button, Radio, Badge } from 'antd';
import LayoutPic from './LayoutPic';
import developer from './developer.png';
import user from './user.png';
import classes from './CreateDashboard.scss';

const { Content, Footer } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const layoutChecked = (type1, type2) => type1 === type2;

function CreateDashboard(props) {
  const {
    form: {
      getFieldDecorator,
      getFieldValue,
      setFieldsValue
    },
    getFieldError,
    errors,
    userMode,
    setUserMode,
    push,
    modDashboardBase
  } = props;
  return (
    <div style={{ height: '100%' }}>
      {userMode !== '' && <Layout key="" style={{ minHeight: '100%' }}>
        <Content>
          <div className={classes.header}>
            <div>
              <div>创建仪表盘</div>
              <div className={classes.titleDescription}>请先创建一个仪表盘，用于大屏的编辑与预览。</div>
            </div>
          </div>
          <div className={classes.container}>
            <Form layout="vertical">
              <Card
                title="基础信息"
                bordered={false}
                style={{ marginBottom: '24px' }}
              >
                <Row gutter={64}>
                  <Col span="6">
                    <FormItem label="名称" {...getFieldError('name', errors)}>
                      {getFieldDecorator('name')(
                        <Input placeholder="给仪表盘起个名字" />
                      )}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="设备尺寸">
                      {getFieldDecorator('size')(
                        <RadioGroup>
                          <RadioButton value="3840*2160">3840*2160</RadioButton>
                          <RadioButton value="2880*1800">2880*1800</RadioButton>
                          <RadioButton value="1920*1080">1920*1080</RadioButton>
                          <RadioButton value="1600*1200">1600*1200</RadioButton>
                          <RadioButton value="1280*1024">1280*1024</RadioButton>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="行业风格">
                      {getFieldDecorator('industry')(
                        <RadioGroup>
                          <RadioButton value="运营商">运营商</RadioButton>
                          <RadioButton value="金融">金融</RadioButton>
                          <RadioButton value="能源">能源</RadioButton>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Card>
              <Card
                title="界面布局"
                bordered={false}
              >
                <FormItem {...getFieldError('template', errors)}>
                  {props.templateGroups
                    .filter(group => group.industry === getFieldValue('industry'))
                    .map(group => (
                      <div key={group.id} style={group.templates.filter(template => template.size === getFieldValue('size')).length === 0 ? { display: 'none' } : {}}>
                        <div className={classes.groupName}>
                          <Badge
                            count={group.templates.filter(template => template.size === getFieldValue('size')).length}
                            showZero
                            offset={[6, 16]}
                            style={{
                              background: '#68B92E'
                            }}
                          >
                            {group.name}
                          </Badge>
                        </div>
                        <Row gutter={24}>
                          {group.templates
                            .filter(template => template.size === getFieldValue('size'))
                            .map(template => (
                              <Col
                                span="6"
                                key={template.id}
                                onClick={() => setFieldsValue({ template: template.id })}
                                style={{ marginBottom: '24px' }}
                              >
                                <LayoutPic
                                  checked={layoutChecked(template.id, getFieldValue('template'))}
                                  template={template}
                                />
                              </Col>
                            ))}
                        </Row>
                      </div>
                    ))
                  }
                </FormItem>
              </Card>
            </Form>
          </div>
        </Content>
        <Footer className={classes.footer}>
          <div>
            <Button
              size="large"
              style={{ marginRight: '16px' }}
              onClick={() => push('/main/dashboards')}
            >
              取消
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => modDashboardBase()}
            >
              提交
            </Button>
          </div>
        </Footer>
      </Layout>}
      {userMode === '' && <div className={classes.modeContent} key="modeContent">
        <Card
          title="模式选择"
        >
          <div className={classes.cardContainer}>
            <div
              className={classes.modeChoice}
              onClick={() => setUserMode('PRODUCER')}
            >
              <div className={classes.modeCard}>
                <img alt="我是用户" src={user} />
                <div>我是用户</div>
              </div>
              <div className={classes.modeDescription}>
                直接编辑大屏数据，简单易懂快速上手，适合小白用户
              </div>
            </div>
            <div
              className={classes.modeChoice}
              onClick={() => setUserMode('DEVELOPER')}
            >
              <div className={classes.modeCard}>
                <img alt="我是开发者" src={developer} />
                <div>我是开发者</div>
              </div>
              <div className={classes.modeDescription}>
                通过动态json数据源修改大屏数据，适合前端同学
              </div>
            </div>
          </div>
        </Card>
      </div>}
    </div>
  );
}

CreateDashboard.propTypes = {
  form: PropTypes.object,
  getFieldError: PropTypes.func,
  errors: PropTypes.object,
  push: PropTypes.func,
  templateGroups: PropTypes.array,
  userMode: PropTypes.string,
  setUserMode: PropTypes.func,
  modDashboardBase: PropTypes.func
};

export default CreateDashboard;
