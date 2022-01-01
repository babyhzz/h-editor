import { LayerTemplate } from '@/layers/typing';

const BasicTitleTemplate: LayerTemplate = {
  type: 'BasicTitle',
  name: '标题',
  width: 100,
  height: 36,
  config: [
    {
      key: 'text',
      name: '标题文本',
      type: 'text',
      default: '这是一个标题',
    },
    {
      key: 'backgroundColor',
      name: '背景颜色',
      type: 'color',
      default: '#F89878',
      prefixed: true,
    },
  ],
};

export default BasicTitleTemplate;
