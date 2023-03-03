import axios from 'axios';
import { showToast } from 'vant';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API||'http://www.baidu.com',
  timeout: 60000,
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie这些
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    if (config.method === 'get') {
      config.params &&
        Object.keys(config.params).forEach((item) => {
          if (
            config.params[item] === null ||
            config.params[item] === undefined
          ) {
            config.params[item] = '';
          }
        });
    } else {
      config.data &&
        Object.keys(config.data).forEach((item) => {
          if (config.data[item] === null || config.data[item] === undefined) {
            config.data[item] = '';
          }
        });
    }
    const token = localStorage.getItem('Access-Token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    if (config.requestConfig && config.requestConfig.timeout) {
      config.timeout = config.requestConfig.timeout;
    }
    return config;
  },
  (error) => {
    showToast(`请求失败，${error.toString()}`);
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data;
    } else if (response.data.code === 401) {
      // do something
      return Promise.reject(response.data);
    } else {
      if (
        !response.config.requestConfig ||
        !response.config.requestConfig.noErrorMsg
      ) {
        const msg = response.data.msg || response.data.message || '系统错误';
        message.error(msg);
      }
      return Promise.reject(response.data);
    }
  },
  (error) => {
    showToast(`响应失败，${error.toString()}`);
    return Promise.reject(error);
  }
);

/**
 *
 * @param {String} method 请求方法(get|post|put|patch|delete...)
 * @param {String} url 请求地址
 * @param {Object} data 请求数据,key/value格式
 * @param {Object} requestConfig 请求配置，（noErrorMsg:错误请求是否展示提示;timeout:超时时间）
 * @returns {Promise} 响应
 * @示例
 * 		await this.$request('get', `/dms/station/detail/${this.id}`, data, {noErrorMsg:false})
 * 		await this.$request({url:xxx, data:xxx, method:xxx, requestConfig:xxx})
 */
const request = (method, url, data, requestConfig) => {
  if (typeof method === 'object') {
    const config = method;
    url = config.url || '/';
    data = config.data || {};
    method = config.method || 'post';
    requestConfig = config.requestConfig || null;
  }
  const option = {
    url,
    method,
    requestConfig,
  };
  if (/put|post|patch/i.test(method)) {
    option.data = data;
  } else {
    option.params = data;
  }
  return instance(option);
};

export default request;
