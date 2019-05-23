import ArticleListContainer, { initLoader } from './containers/ArticleListContainer';
import ArticleList from './modules';

export const articleListReducer = {
  ArticleList,
};
export const ArticleListInitLoader = initLoader;
export default ArticleListContainer;
