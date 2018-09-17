import VirusTypeDistrubution from './VirusTypeDistrubution';
import MasterControlIPAffectedHostTop5 from './MasterControlIPAffectedHostTop5';
import ControlledIPVirusEventTop5 from './ControlledIPVirusEventTop5';
import LatestSecurityEvent from './LatestSecurityEvent';

import MainBoard from './MainBoard';

export {
  VirusTypeDistrubution,
  MasterControlIPAffectedHostTop5,
  ControlledIPVirusEventTop5,
  LatestSecurityEvent,
  MainBoard
};

const components = {
  VirusTypeDistrubution: [{
    name: '病毒类型分布',
    type: 'VirusTypeDistrubution',
    component: VirusTypeDistrubution
  }],
  MasterControlIPAffectedHostTop5: [{
    name: '主控IP影响主机情况TOP5',
    type: 'MasterControlIPAffectedHostTop5',
    component: MasterControlIPAffectedHostTop5
  }],
  ControlledIPVirusEventTop5: [{
    name: '被控IP病毒事件情况TOP5',
    type: 'ControlledIPVirusEventTop5',
    component: ControlledIPVirusEventTop5
  }],
  LatestSecurityEvent: [{
    name: '最新安全事件',
    type: 'LatestSecurityEvent',
    component: LatestSecurityEvent
  }]
};

export default components;
