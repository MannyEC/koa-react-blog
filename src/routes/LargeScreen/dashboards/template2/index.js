import Header from './Header';
import AliveAndRecord from './AliveAndRecord';
import AssetAllocation from './AssetAllocation';
import PortTop5 from './PortTop5';
import ServiceTop5 from './ServiceTop5';
import EventHandle from './EventHandle';
import EventType from './EventType';
import Monitor from './Monitor';
import TypeChange from './TypeChange';
import MainBoard from './MainBoard';

export {
  Header,
  AliveAndRecord, 
  AssetAllocation,
  PortTop5,
  ServiceTop5,
  EventHandle,
  EventType,
  Monitor,
  TypeChange,
  MainBoard
};

const components = {
  Header: [{
    name: '流量趋势',
    type: 'Header',
    component: Header
  }],
  AliveAndRecord: [{
    name: '流量趋势',
    type: 'AliveAndRecord',
    component: AliveAndRecord
  }],
  AssetAllocation: [{
    name: '流量趋势',
    type: 'AssetAllocation',
    component: AssetAllocation
  }],
  PortTop5: [{
    name: '流量趋势',
    type: 'PortTop5',
    component: PortTop5
  }],
  ServiceTop5: [{
    name: '流量趋势',
    type: 'ServiceTop5',
    component: ServiceTop5
  }],
  EventHandle: [{
    name: '流量趋势',
    type: 'EventHandle',
    component: EventHandle
  }],
  EventType: [{
    name: '流量趋势',
    type: 'EventType',
    component: EventType
  }],
  Monitor: [{
    name: '流量趋势',
    type: 'Monitor',
    component: Monitor
  }],
  TypeChange: [{
    name: '流量趋势',
    type: 'TypeChange',
    component: TypeChange
  }],
};

export default components;
