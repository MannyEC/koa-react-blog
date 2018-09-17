import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Button, Row, Col, Input, Tooltip } from 'antd';
import logo from './assets/logo.svg';
import bg from './assets/bg.png';
import classes from './Login.scss';

const getError = (errorInfo) => {
  let error = '';
  const errorKeys = Object.keys(errorInfo);
  if (errorKeys.includes('username') || errorKeys.includes('password')) {
    error = '用户名或密码不正确';
  } else {
    error = errorKeys.length > 0 ? errorInfo[errorKeys[0]].join('') : '';
  }
  return error;
};

@Form.create()
class Login extends Component {
  static propTypes = {
    form: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    error: PropTypes.object,
    updateData: PropTypes.bool,
    clearExpiredError: PropTypes.func.isRequired,
    getImageVerificationCode: PropTypes.func,
    checkImageVerificationCode: PropTypes.func,
    needImageVerification: PropTypes.bool,
    router: PropTypes.shape({
      push: PropTypes.func
    }),
    imageVerification: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getImageVerificationCode = this.getImageVerificationCode.bind(this);
  }

  componentWillMount() {
    this.props.logout();
    this.props.checkImageVerificationCode();
  }

  componentDidMount() {
    setTimeout(() => {
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        const evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
      } else {
        window.dispatchEvent(new Event('resize'));
      }
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updateData === false && nextProps.updateData === true) {
      this.props.clearExpiredError();
      this.props.form.resetFields();
    }
  }

  getImageVerificationCode() {
    this.props.getImageVerificationCode();
  }

  handleSubmit(event) {
    event.preventDefault();
    const fieldsValue = this.props.form.getFieldsValue();
    this.props.login(fieldsValue.username, fieldsValue.pass, fieldsValue.captcha);
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const errorInfo = this.props.error;
    const error = getError(errorInfo);

    const backgroundStyle = {
      background: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    };
    return (
      <div className={`${classes.loginPage} container`} style={backgroundStyle}>
        <div className={classes.content}>
          <div style={{ minHeight: this.props.needImageVerification ? 380 : 340 }}>
            <div className={classes.titleContainer}>
              <div className={classes.logo}>
                <img src={logo} alt="logo" />
              </div>
            </div>
            <div className={classes.form}>
              <Form layout="horizontal">
                <div className={classes.error_info}>{error}</div>
                <div className={classes.form_item}>
                  {getFieldDecorator('username')(
                    <Input
                      className={classNames({
                        [classes.input]: true,
                        [classes.username]: true,
                        [classes.error]: error.length > 0
                      })}
                      type="text"
                      placeholder="用户名"
                    />
                  )}
                  <br />
                  {getFieldDecorator('pass')(
                    <Input
                      className={classNames({
                        [classes.input]: true,
                        [classes.password]: true,
                        [classes.error]: error.length > 0
                      })}
                      type="password"
                      placeholder="密码"
                    />
                  )}
                </div>
                {this.props.needImageVerification && <FormItem
                  className={classes.form_item}
                  label=""
                >
                  <Row className={classes.captchaRow}>
                    <Col span={11}>
                      {getFieldDecorator('captcha')(<Input className={classes.captcha} type="text" placeholder="验证码" />)}
                    </Col>
                    <Col span={12} offset={1}>
                      <Tooltip title="点击刷新验证码">
                        <img
                          className={classes.captchaPic}
                          src={this.props.imageVerification}
                          onClick={this.getImageVerificationCode}
                          alt="点击刷新验证码"
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                </FormItem>}
                <Row >
                  <Col className={classes.form_item}>
                    <Button className={classes.come} type="primary" htmlType="submit" onClick={this.handleSubmit}>登录</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
