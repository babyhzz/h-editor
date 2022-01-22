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
  theme: {
    // '@slider-rail-background-color': '#FFF',
    // @slider-rail-background-color-hover: #e1e1e1;
    // '@slider-track-background-color': '#21dfe2',
    // '@slider-track-background-color-hover': '#21dfe2',
  },
  routes: [{ path: '/', component: '@/pages/Editor' }],
  fastRefresh: {},
});
