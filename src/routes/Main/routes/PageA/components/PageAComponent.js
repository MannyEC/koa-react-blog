import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from 'lodash';

export const pageAReducer = {
};

class PageAComponent extends Component {
  componentDidMount() {
    const { loadPost } = this.props;
    loadPost();
  }

  render() {
    const { name, history, posts } = this.props;
    const postLists = posts.map((item) => {
      return (<div>title: {item.title}</div>);
    });
    return (
      <div>
        pageA is powered by {name}
        {postLists}
        <div onClick={() => history.push('/main/rootB')}>go to B</div>
      </div>
    );
  }
}

export default PageAComponent;
