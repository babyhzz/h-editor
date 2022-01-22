import { LayerTemplate } from '@/layers/typing';
import BasicTitle from './index';

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
      key: 'fontSize',
      name: '字体大小',
      type: 'number',
      default: 14,
    },
    {
      key: 'textAlign',
      name: '对齐方式',
      type: 'select',
      comProps: {
        options: [
          {
            label: '左对齐',
            value: 'left',
          },
          {
            label: '居中',
            value: 'center',
          },
          {
            label: '右对齐',
            value: 'right',
          },
        ],
      },
      default: 'left',
    },
    {
      key: 'backgroundColor',
      name: '背景颜色',
      type: 'color',
      default: '#F89878',
      comProps: {
        prefixed: true,
      },
    },
  ],
};

export default BasicTitleTemplate;
