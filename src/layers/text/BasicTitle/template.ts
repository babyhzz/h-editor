import { LayerTemplate } from '@/layers/typing';

const BasicTitleTemplate: LayerTemplate = {
  type: 'BasicTitle',
  name: '标题',
  width: 600,
  height: 400,
  config: [
    {
      key: 'text',
      name: '标题文本',
      type: 'text',
    },
  ],
};

export default BasicTitleTemplate;
