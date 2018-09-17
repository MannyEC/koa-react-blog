import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  Layout,
  Form,
  Row,
  Col,
  Card,
  Input,
  Upload,
  Icon,
  message,
  Button,
  Tooltip,
  Select,
  Modal
} from 'antd';
import DisplayCover from './DisplayCover';
import dashboards from '../dashboards';
import classes from './EditComponent.scss';

const { Content } = Layout;
const BreadcrumbItem = Breadcrumb.Item;
const FormItem = Form.Item;
const { TextArea } = Input;
const { Dragger } = Upload;
const { Option } = Select;

export default class EditComponent extends Component {
  static propTypes = {
    match: PropTypes.object,
    dataSource: PropTypes.object,
    form: PropTypes.object,
    getFieldError: PropTypes.func,
    errors: PropTypes.object,
    dashboard: PropTypes.object,
    initComponentForm: PropTypes.func,
    currentModule: PropTypes.object,
    loadCurrentModule: PropTypes.func,
    loadDashboard: PropTypes.func,
    modCurrentModule: PropTypes.func
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      dataSourceName: ''
    };
    this.getComponent = this.getComponent.bind(this);
    this.getSupportDisplayTypes = this.getSupportDisplayTypes.bind(this);
  }

  componentDidMount() {
    const { match, loadCurrentModule, loadDashboard } = this.props;
    const { dashboardKey, layoutKey } = match.params;
    loadDashboard(dashboardKey);
    loadCurrentModule(layoutKey);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.dashboardKey !== nextProps.match.params.dashboardKey ||
      this.props.match.params.layoutKey !== nextProps.match.params.layoutKey
    ) {
      const { match, loadCurrentModule, loadDashboard } = nextProps;
      const { dashboardKey, layoutKey } = match.params;
      loadDashboard(dashboardKey);
      loadCurrentModule(layoutKey);
    }
  }

  getSupportDisplayTypes() {
    const { currentModule, dashboard } = this.props;
    const template = dashboard.template ? dashboard.template.name : '';
    if (Object.keys(dashboards).includes(template)) {
      const { components } = dashboards[template];
      if (currentModule &&
        currentModule.type &&
        Object.keys(components).includes(currentModule.type)
      ) {
        const currentSupportTypes = currentModule.template_module
          && currentModule.template_module.support_display_types
          ? currentModule.template_module.support_display_types
          : [];
        return components[currentModule.type]
          .filter(component => currentSupportTypes.includes(component.type))
          .map(component => ({
            type: component.type,
            name: component.name
          }));
      }
    }
    return [];
  }

  getComponent() {
    const { currentModule, dashboard, form: { getFieldValue } } = this.props;
    const template = dashboard.template ? dashboard.template.name : '';
    const currentDisplayType = getFieldValue('display_type');
    if (Object.keys(dashboards).includes(template)) {
      const { components } = dashboards[template];
      if (currentModule &&
        currentModule.type &&
        currentDisplayType &&
        Object.keys(components).includes(currentModule.type) &&
        components[currentModule.type]
          .find(component => component.type === currentDisplayType)
      ) {
        return components[currentModule.type]
          .find(component => component.type === currentDisplayType).component;
      }
    }
    return null;
  }

  render() {
    const {
      form: { getFieldDecorator },
      getFieldError,
      errors,
      match,
      dashboard,
      currentModule,
      modCurrentModule,
      loadCurrentModule
    } = this.props;
    const ComponentItem = this.getComponent();
    const supportDisplayTypes = this.getSupportDisplayTypes();
    const tempComponent = ComponentItem ? new ComponentItem() : { exampleData: '' };
    const devMod = dashboard && dashboard.applicable_crowd === 'DEVELOPER';
    const uploadThis = this;
    const props = {
      name: 'file',
      multiple: false,
      action: '/api/v1/datasourceupload/',
      data: {
        name: uploadThis.state.dataSourceName || 'datasource',
        template_module: currentModule && currentModule.template_module
          ? currentModule.template_module.id
          : null,
        current_module: currentModule.id
      },
      headers: {
        Authorization: `Token ${sessionStorage.userToken}`
      },
      showUploadList: false,
      beforeUpload(file) {
        const promise = new Promise((resolve, reject) => {
          uploadThis.modal = Modal.success({
            title: '数据源名称',
            content: <Input placeholder="数据源名称" onChange={e => uploadThis.setState({ dataSourceName: e.target.value })} />,
            okText: '上传',
            onOk: resolve,
            onCancel: reject
          });
        });
        return promise;
      },
      onChange(info) {
        const { status } = info.file;
        if (status === 'uploading') {
          uploadThis.setState({ uploading: true });
        } else {
          uploadThis.setState({ uploading: false });
          if (status !== 'error') {
            const { layoutKey } = match.params;
            loadCurrentModule(layoutKey);
            message.success('上传成功');
          }
          uploadThis.modal.destroy();
        }
        if (status === 'error') {
          if (info.file && info.file.response && info.file.response.file) {
            message.error(`上传失败: ${info.file.response.file.join('')}`);
          } else {
            message.error('上传失败');
          }
        }
      }
    };
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
                <Link
                  className={classes.breadcrumb}
                  to={`/largescreen/show/${dashboard.id}`}
                >
                  {dashboard.name}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span style={{ color: '#fff' }}>编辑控件</span>
              </BreadcrumbItem>
            </Breadcrumb>
            <Button
              type="primary"
              size="large"
              className={classes.saveButton}
              onClick={() => modCurrentModule()}
            >
              保存
            </Button>
          </div>
          <div
            style={{
              minHeight: 'calc(100vh - 64px)',
              paddingTop: '64px'
            }}
          >
            <div className={classes.preview}>
              <div className={classes.previewContent}>
                <DisplayCover>
                  {ComponentItem && <ComponentItem config={currentModule} />}
                </DisplayCover>
              </div>
            </div>
            <div className={classes.formArea}>
              <Form layout="vertical">
                <Row>
                  <Col span="24">
                    <Card className={classes.formCard}>
                      <FormItem
                        label="展示名称"
                        {...getFieldError('title', errors)}
                      >
                        {getFieldDecorator('title')(<Input placeholder="请输入名称" />)}
                      </FormItem>
                      {supportDisplayTypes.length > 1 && (
                        <FormItem
                          label="可视化方式"
                          {...getFieldError('display_type', errors)}
                        >
                          {getFieldDecorator('display_type')(<Select>
                            {supportDisplayTypes.map(displayType => (
                              <Option key={displayType.type} value={displayType.type}>
                                {displayType.name}
                              </Option>
                            ))}
                          </Select>)}
                        </FormItem>
                      )}
                      {devMod && <FormItem
                        label="数据源刷新间隔"
                        {...getFieldError('refresh_interval', errors)}
                      >
                        {getFieldDecorator('refresh_interval')(<Input placeholder="请输入间隔" addonAfter="秒" />)}
                      </FormItem>}
                      {devMod && <FormItem
                        label="数据源URL"
                        {...getFieldError('datasource_url', errors)}
                      >
                        {getFieldDecorator('datasource_url')(<TextArea autosize placeholder="请输入URL" />)}
                      </FormItem>}
                      {false && <FormItem
                        label="数据源名称"
                        {...getFieldError('datasource_name', errors)}
                      >
                        {getFieldDecorator('datasource_name')(<Input placeholder="请输入名称" />)}
                      </FormItem>}
                    </Card>
                  </Col>
                  <Col span="24">
                    <Card>
                      {devMod && <div className={classes.example}>
                        <div>动态数据源接口数据示例</div>
                        <TextArea
                          autosize
                          readOnly
                          value={JSON.stringify(tempComponent.exampleData, null, 4)}
                        />
                      </div>}
                      {!devMod && <FormItem
                        label={<div className={classes.editTitle}>
                          编辑数据
                          <Tooltip title="下载样本数据">
                            <a
                              href={['/api/v1/datasourceexampledownload/',
                                [
                                  `display_type=${currentModule.display_type}`,
                                  `auth_token=${sessionStorage.userToken}`
                                ].join('&')
                              ].join('?')}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Icon type="download" />
                            </a>
                          </Tooltip>
                        </div>}
                        {...getFieldError('datasource_content', errors)}
                      >
                        {!devMod && <div style={{ marginBottom: '12px' }}>
                          <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                              {this.state.uploading && <Icon type="loading" />}
                              {!this.state.uploading && <Icon type="upload" />}
                            </p>
                            <p className="ant-upload-text">点击或拖拽上传数据源文件</p>
                          </Dragger>
                        </div>}
                        {getFieldDecorator('datasource_content')(<TextArea autosize />)}
                      </FormItem>}
                    </Card>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}
