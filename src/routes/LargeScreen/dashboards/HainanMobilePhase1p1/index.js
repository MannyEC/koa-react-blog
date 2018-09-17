import BarAndTable from './BarAndTable';
import DataAnalysis from './DataAnalysis';
import AttackChain from './AttackChain';
import PieAndTable from './PieAndTable';

import MainBoard from './MainBoard';

export {
  DataAnalysis,
  BarAndTable,
  PieAndTable,
  AttackChain,
  MainBoard
};

const components = {
  LeftTop: [{
    name: '大数据安全分析',
    type: 'DataAnalysis',
    component: DataAnalysis
  }],
  LeftBottomLeft: [{
    name: '柱状图+表格',
    type: 'BarAndTable',
    component: BarAndTable
  }],
  LeftBottomRight: [{
    name: '饼图+表格',
    type: 'PieAndTable',
    component: PieAndTable
  }],
  RightBar: [{
    name: '攻击链分析',
    type: 'AttackChain',
    component: AttackChain
  }]
};

export default components;
