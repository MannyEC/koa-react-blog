import template1, { MainBoard as template1MainBoard } from './template1';
import yjfd, { MainBoard as yjfdMainBoard } from './yjfd';
import template2, { MainBoard as template2MainBoard } from './template2';
import chongqingmobile4, { MainBoard as chongqiMobile4Board } from './chongqingmobile4';
import HainanMobilePhase1p1, { MainBoard as HainanMobilePhase1p1MainBoard } from './HainanMobilePhase1p1';
import chongqingmobile8, { MainBoard as chongqingmobile8MainBoard} from './chongqingmobile8';
import ZhejiangRCC, { MainBoard as ZhejiangRCCMainBoard } from './ZhejiangRCC';
const dashboards = {
  template1: {
    MainBoard: template1MainBoard,
    components: template1
  },
  yjfd: {
    MainBoard: yjfdMainBoard,
    components: yjfd
  },
  template2: {
    MainBoard: template2MainBoard,
    components: template2
  },
  HainanMobilePhase1p1: {
    MainBoard: HainanMobilePhase1p1MainBoard,
    components: HainanMobilePhase1p1
  },
  chongqingmobile8: {
    MainBoard: chongqingmobile8MainBoard,
    components: chongqingmobile8
  },
  chongqingmobile4: {
    MainBoard: chongqiMobile4Board,
    components: chongqingmobile4
  },
  ZhejiangRCC: {
    MainBoard: ZhejiangRCCMainBoard,
    components: ZhejiangRCC
  },

};

export default dashboards;
