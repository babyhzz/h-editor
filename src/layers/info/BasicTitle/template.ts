import type { LayerTemplate } from '@/layers/typing';

const BasicTitleTemplate: LayerTemplate = {
  type: 'BasicTitle',
  category: 'info',
  icon: 'icon-comp-Text',
  name: '标题',
  width: 300,
  height: 80,
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
      default: '#00000000',
    },
    {
      key: 'textStyle',
      name: '文本样式',
      type: 'none',
      children: [
        {
          key: 'fontSize',
          name: '字体大小',
          type: 'number',
          default: 28,
        },
        {
          key: 'fontColor',
          name: '字体颜色',
          type: 'color',
          default: '#00FFDD',
        },
        {
          key: 'fontWeight',
          name: '字体粗细',
          type: 'select',
          default: 'normal',
          comProps: {
            options: [
              {
                label: 'Normal',
                value: 'normal',
              },
              {
                label: 'Bold',
                value: 'bold',
              },
              {
                label: 'Bolder',
                value: 'bolder',
              },
            ],
          },
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
          default: 'center',
        },
      ],
    },
  ],
};

export default BasicTitleTemplate;
