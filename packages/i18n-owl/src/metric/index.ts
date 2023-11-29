interface AddErrorOptions {
  category?: string; // 异常分类  jsError、ajaxError、resourceError 和自定义的业务异常
  level?: string; // 表示异常等级，可选 error、warn 和 info，默认为 error
  tags?: Object; // 表示异常的自定义信息
  combo?: boolean; // 表示是否要和其他异常延时合并上报。默认不合并上报，combo 设置为 true 时合并上报
}

class Metric {
  owl: any;
  newMetricInst: any;
  constructor(config) {
    // 只支持web
    try {
      const pageUrl =
        window &&
        window.location &&
        window.location.origin + window.location.pathname;
      this.owl = new window.Owl.OWL({
        devMode: false,
        project: '',
        region: 'HK',
        pageUrl,
        realUrl: pageUrl,
        isSPA: true,
        autoCatch: {
          fetch: false,
          page: false,
          ajax: false,
          resource: false,
          js: false,
          console: false,
          pv: false,
        },
        enableLogTrace: false,
        ...config,
      });
      this.newMetricInst = this.owl.newMetricInst();
    } catch (error) {
      console.error('@sailor/i18n-owl初始化错误', error);
    }
  }
  setTags(tags) {
    try {
      if (this.newMetricInst) {
        this.newMetricInst.setTags(tags);
      }
    } catch (error) {
      console.error('i18n setTags error', error);
    }
  }
  setMetric(...args: any[]) {
    try {
      if (this.newMetricInst) {
        this.newMetricInst.setMetric(...args);
      }
    } catch (error) {
      console.error('i18n setMetric error', error);
    }
  }
  addError(error, options: AddErrorOptions = {}) {
    try {
      if (this.owl) {
        this.owl.addError(error, {
          category: 'jsError',
          level: 'error',
          ...options,
        });
      }
    } catch (error) {
      console.error('i18n addError error', error);
    }
  }
}

export default Metric;
