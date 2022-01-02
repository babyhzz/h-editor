import { LayerTemplate } from '@/layers/typing';

const BasicLineChartTemplate: LayerTemplate = {
  type: 'BasicLineChart',
  name: '基础折线图',
  width: 400,
  height: 300,
  config: [
    // {
    //   key: 'text',
    //   name: '标题文本',
    //   type: 'text',
    //   default: '这是一个标题',
    // },
    // {
    //   key: 'fontSize',
    //   name: '字体大小',
    //   type: 'number',
    //   default: 14,
    // },
    // {
    //   key: 'textAlign',
    //   name: '对齐方式',
    //   type: 'select',
    //   options: [
    //     {
    //       label: '左对齐',
    //       value: 'left',
    //     },
    //     {
    //       label: '居中',
    //       value: 'center',
    //     },
    //     {
    //       label: '右对齐',
    //       value: 'right',
    //     },
    //   ],
    //   default: 'left',
    // },
    // {
    //   key: 'backgroundColor',
    //   name: '背景颜色',
    //   type: 'color',
    //   default: '#F89878',
    //   prefixed: true,
    // },
  ],
  dataFields: [
    {
      key: 'x',
      description: '日期',
    },
    {
      key: 'y',
      description: '数量',
    },
  ],
  dataTemplate: [
    {
      x: '2000-06-05',
      y: 116,
    },
    {
      x: '2000-06-06',
      y: 129,
    },
    {
      x: '2000-06-07',
      y: 135,
    },
    {
      x: '2000-06-08',
      y: 86,
    },
    {
      x: '2000-06-09',
      y: 73,
    },
    {
      x: '2000-06-10',
      y: 85,
    },
  ],
};

export default BasicLineChartTemplate;
