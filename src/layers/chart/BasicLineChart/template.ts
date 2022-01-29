import type { LayerTemplate } from '@/layers/typing';

const BasicLineChartTemplate: LayerTemplate = {
  type: 'BasicLineChart',
  category: 'chart',
  name: '折线图',
  width: 400,
  height: 300,
  config: [
    {
      key: 'backgroundColor',
      name: '背景色',
      type: 'color',
      default: '#00000000',
    },
    {
      key: 'series',
      name: '系列',
      type: 'array',
      default: [],
      children: [
        {
          key: 'seriesName',
          name: '系列名称',
          type: 'text',
          default: '系列',
        },
      ],
    },
    {
      key: 'xAxisShow',
      name: 'X轴',
      type: 'switch',
      default: true,
      children: [
        {
          key: 'xAxisSplitLineShow',
          name: '分割线',
          type: 'switch',
          default: false,
        },
      ],
    },
    {
      key: 'yAxisShow',
      name: 'Y轴',
      type: 'switch',
      default: true,
      children: [
        {
          key: 'yAxisSplitLineShow',
          name: '分割线',
          type: 'switch',
          default: false,
        },
      ],
    },
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
