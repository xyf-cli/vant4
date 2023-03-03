import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';



import { setupVant, setupAssets, setupGlobalMethods } from '@/plugins';

const app = createApp(App);

function setupPlugins() {
  // 注册全局常用的vant组件
  setupVant(app);
  // 引入静态资源
  setupAssets();
  // // 注册全局自定义组件,如：<svg-icon />
  // setupCustomComponents(app);
  // // 注册全局自定义指令，如：v-permission权限指令
  // setupDirectives(app);
  // // 注册全局方法，如：app.config.globalProperties.$message = message
  setupGlobalMethods(app);
}

app.use(createPinia());
app.use(router);

setupPlugins();

app.mount('#app');
