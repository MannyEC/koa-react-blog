import AtkSrcGeoTop from './AtkSrcGeoTop';
import AttackedPeakDistrubution from './AttackedPeakDistrubution';
import AttackDurationDistrubution from './AttackDurationDistrubution';
import NetworkTraffic from './NetworkTraffic';
import AttackCountRank from './AttackCountRank';
import AtkDstipTop5 from './AtkDstipTop5';
import AtkSrcipTop5 from './AtkSrcipTop5';

import MainBoard from './MainBoard';

export {
  NetworkTraffic,
  AttackedPeakDistrubution,
  AtkSrcipTop5,
  AttackCountRank,
  AttackDurationDistrubution,
  AtkSrcGeoTop,
  AtkDstipTop5,
  MainBoard
};

const components = {
  NetworkTraffic: [{
    name: '流量趋势',
    type: 'NetworkTraffic',
    component: NetworkTraffic
  }],
  AttackedPeakDistrubution: [{
    name: '攻击峰值分布',
    type: 'AttackedPeakDistrubution',
    component: AttackedPeakDistrubution
  }],
  AtkSrcipTop5: [{
    name: '源IP Top5',
    type: 'AtkSrcipTop5',
    component: AtkSrcipTop5
  }],
  AttackCountRank: [{
    name: '攻击排名',
    type: 'AttackCountRank',
    component: AttackCountRank
  }],
  AttackDurationDistrubution: [{
    name: '攻击时长分布',
    type: 'AttackDurationDistrubution',
    component: AttackDurationDistrubution
  }],
  AtkSrcGeoTop: [{
    name: '攻击源地区',
    type: 'AtkSrcGeoTop',
    component: AtkSrcGeoTop
  }],
  AtkDstipTop5: [{
    name: '目的IP Top5',
    type: 'AtkDstipTop5',
    component: AtkDstipTop5
  }]
};

export default components;
