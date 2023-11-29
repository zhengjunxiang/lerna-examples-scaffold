import * as i18next from 'i18next';
import Metric from '../metric';
import { isSupportOwl } from '../utils';

declare module 'i18next' {
  interface PluginOptions {
    owl?: OwlOptions;
  }
  interface i18n {
    $owl: Metric;
  }
  interface Services {
    $owl: Metric;
  }
}
interface OwlOptions {
  devMode?: boolean;
  isSPA?: boolean;
  region?: string;
  open?: boolean;
}

const owlPlugin: i18next.ThirdPartyModule = {
  type: '3rdParty',
  init(instance: i18next.i18n): void {
    // 目前只在配置了 backend 下开启owl
    if (!instance.modules.backend) return;
    const { owl } = instance.options;
    const {
      devMode = false,
      isSPA = true,
      region = 'HK',
      open = true,
    } = owl || {};
    if (!devMode) {
      // 只上报 mykeeta.com
      const host = window.location.host;
      if (!host.endsWith('mykeeta.com')) {
        return;
      }
    }
    if (open && isSupportOwl()) {
      const metricInst = new Metric({
        project: 'com.sankuai.sailorfe.i18n.sdk',
        devMode,
        isSPA,
        region,
      });
      instance.$owl = metricInst;
      instance.services.$owl = metricInst;
    }
  },
};
export type { OwlOptions };
export default owlPlugin;
