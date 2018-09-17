import DnsOverallAnalyticIndicators from './DnsOverallAnalyticIndicators';
import DnsServerAnalyticIndicators from './DnsServerAnalyticIndicators';
import IntrusionEventSituation from './IntrusionEventSituation';
import RecentDdosEvent from './RecentDdosEvent';
import SystemVulSituation from './SystemVulSituation';

import MainBoard from './MainBoard';

export {
    DnsOverallAnalyticIndicators,
    DnsServerAnalyticIndicators,
    MainBoard
};

const components = {  
    DnsOverallAnalyticIndicators: [
        {
            name: 'DNS整体解析指标',
            type: 'DnsOverallAnalyticIndicators',
            component: DnsOverallAnalyticIndicators
        }
    ],
    DnsServerAnalyticIndicators: [
        {
            name: 'DNS服务器解析指标',
            type: 'DnsServerAnalyticIndicators',
            component: DnsServerAnalyticIndicators
        }
    ],
    IntrusionEventSituation: [
        {
            name: '入侵事件态势',
            type: 'IntrusionEventSituation',
            component: IntrusionEventSituation
        }
    ],
    RecentDdosEvent: [
        {
            name: '最近DDoS事件',
            type: 'RecentDdosEvent',
            component: RecentDdosEvent
        }
    ],
    SystemVulSituation: [
        {
            name: '系统漏洞态势',
            type: 'SystemVulSituation',
            component: SystemVulSituation
        }

    ]
};

export default components;
