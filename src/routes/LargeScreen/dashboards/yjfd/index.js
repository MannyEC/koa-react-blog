import PlatformTitle from './LeftTop/PlatformTitle';
import PlatformInfo from './LeftMiddle/PlatformInfo';
import BlockTimeTop5 from './LeftBottom/BlockTimeTop5';
import BlockIPDistribution from './RightTop/BlockIPDistribution';
import BlockRealIP from './RightBottomLeft/BlockRealIP';
import BlockRealDomain from './RightBottomRight/BlockRealDomain';
import MainBoard from './MainBoard';

export {
  PlatformTitle, 
  PlatformInfo,
  BlockTimeTop5,
  BlockIPDistribution, 
  BlockRealIP,
  BlockRealDomain,
  MainBoard
};

const components = {
  LeftTop: [{
    name: '',
    type: 'PlatformTitle',
    component: PlatformTitle
  }], 
  RightTop: [{
    name: '封堵IP分布',
    type: 'BlockIPDistribution',
    component: BlockIPDistribution
  }],
  LeftMiddle: [{
    name: '',
    type: 'PlatformInfo',
    component: PlatformInfo
  }],
  LeftBottom: [{
    name: '封堵时常TOP5',
    type: 'BlockTimeTop5',
    component: BlockTimeTop5
  }],
  RightBottomLeft: [{
    name: '实时封堵IP',
    type: 'BlockRealIP',
    component: BlockRealIP
  }],
  RightBottomRight: [{
    name: '实时封堵域名',
    type: 'BlockRealDomain',
    component: BlockRealDomain
  }]
};

export default components;
