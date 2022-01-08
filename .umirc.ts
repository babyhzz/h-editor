import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: true, // 开启暗色主题
    compact: true, // 开启紧凑主题
  },
  dva: {
    immer: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/Editor' }],
  fastRefresh: {},
});
