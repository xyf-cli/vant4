import { showToast } from 'vant';
import request from '@/utils/request';
/**
 * 注册全局方法
 * @param app
 */
export function setupGlobalMethods(app) {
  // 全局挂载Reflect反射对象,以便在vue模板中使用
  app.config.globalProperties.$showToast = showToast;

  app.config.globalProperties.$request = request;
}
