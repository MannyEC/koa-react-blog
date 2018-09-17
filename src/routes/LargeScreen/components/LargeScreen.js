import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom';
import { Breadcrumb, Form, Layout, Input, Icon, Button } from 'antd';


import dashboards from '../dashboards';

import classes from './LargeScreen.scss';

const { Content } = Layout;
const BreadcrumbItem = Breadcrumb.Item;
const FormItem = Form.Item;

const getDashboard = (dashboard) => {
  const dashboardKeys = Object.keys(dashboards);
  if (dashboardKeys.includes(dashboard)) {
    return dashboards[dashboard].MainBoard;
  }
  return null;
};

export default class LargeScreen extends Component {
  static propTypes = {
    match: PropTypes.object,
    form: PropTypes.object,
    getFieldError: PropTypes.func,
    errors: PropTypes.object,
    dashboard: PropTypes.object,
    modules: PropTypes.array,
    modDashboardName: PropTypes.func,
    deployDashboard: PropTypes.func,
    push: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      dashboardNameEdit: false
    };
    this.saveNameChange = this.saveNameChange.bind(this);
  }

  componentDidMount() {
    const { dashboard, push } = this.props;
    const { release } = dashboard;
    if (release && ['RELEASE_STATE_WAITING', 'RELEASE_STATE_DOING'].includes(release.state)) {
      push(`/largescreen/deploy/${dashboard.id}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.dashboard, nextProps.dashboard)) {
      const { dashboard, push } = nextProps;
      const { release } = dashboard;
      if (release && ['RELEASE_STATE_WAITING', 'RELEASE_STATE_DOING'].includes(release.state)) {
        push(`/largescreen/deploy/${dashboard.id}`);
      }
    }
  }

  saveNameChange() {
    this.setState({
      dashboardNameEdit: !this.state.dashboardNameEdit
    });
    if (this.state.dashboardNameEdit) {
      this.props.modDashboardName();
    }
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      getFieldError,
      errors,
      match,
      dashboard,
      deployDashboard
    } = this.props;
    const { editKey } = match.params;

    const Dashborad = getDashboard(dashboard.template ? dashboard.template.name : '');
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Content>
          <Form>
            {editKey && <div className={classes.header}>
              <Breadcrumb className={classes.breadcrumb}>
                <BreadcrumbItem>
                  <Link className={classes.breadcrumb} to="/main/dashboards">
                    我的仪表盘
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <span
                    className={classes.text}
                    style={!this.state.dashboardNameEdit ? {} : { display: 'none' }}
                  >
                    <span style={{ color: '#fff' }}>
                      {getFieldValue('name')}
                    </span>
                  </span>
                </BreadcrumbItem>
              </Breadcrumb>
              <div className={classes.editArea}>
                <FormItem
                  {...getFieldError('name', errors)}
                  style={this.state.dashboardNameEdit ? {} : { display: 'none' }}
                >
                  {getFieldDecorator('name')(<Input onBlur={this.saveNameChange} />)}
                </FormItem>
              </div>
              <Icon
                type="edit"
                onClick={this.saveNameChange}
                className={classes.editIcon}
              />
              <Button
                type="primary"
                size="large"
                className={classes.deployButton}
                onClick={() => deployDashboard(dashboard.id)}
              >
                发布
              </Button>
            </div>}
            <div
              style={{
                height: editKey ? 'calc(100vh - 64px)' : '100vh',
                position: 'relative',
                top: '0'
              }}
            >
              {Dashborad && <Dashborad
                dashboard={this.props.dashboard}
                modules={this.props.modules}
                mode={editKey ? 'edit' : 'show'}
              />}
            </div>
          </Form>
        </Content>
      </Layout>
    );
  }
}
