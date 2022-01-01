import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    immer: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/Editor' }],
  fastRefresh: {},
});
