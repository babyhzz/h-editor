import { LayerTemplate } from '@/layers/typing';

const BasicTitleSchema: LayerTemplate = {
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

export default BasicTitleSchema;
