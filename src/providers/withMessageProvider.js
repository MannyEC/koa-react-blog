import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { message } from 'antd';
import { hideUiMessage } from 'redux/modules/UiMessage/actions';

const withMessageProvider = ComposedComponent => class extends Component {
  static defaultProps = {
    duration: 5
  };

  static propTypes = {
    message: PropTypes.string,
    messageType: PropTypes.string,
    duration: PropTypes.number,
    hideUiMessage: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.messageType !== this.props.messageType
          || nextProps.message !== this.props.message
          || nextProps.duration !== this.props.duration) {
      if (message[nextProps.messageType]) {
        message[nextProps.messageType](nextProps.message, nextProps.duration);
        setTimeout(() => this.props.hideUiMessage(), nextProps.duration * 1000);
      }
    }
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};

const mapStateToProps = state => ({
  message: state.UiMessage.message,
  messageType: state.UiMessage.messageType,
  duration: state.UiMessage.durantion
});

const mapActionCreators = dispatch => bindActionCreators({
  hideUiMessage
}, dispatch);

export default compose(connect(mapStateToProps, mapActionCreators), withMessageProvider);
