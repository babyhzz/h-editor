import type { LayerTemplate } from '@/layers/typing';

const BasicLineChartTemplate: LayerTemplate = {
  type: 'LineChart',
  category: 'chart',
  icon: 'icon-comp-LineChart',
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
      max: 5,
      children: [
        {
          key: 'name',
          name: '系列名称',
          type: 'text',
          default: '系列',
        },
        {
          key: 'type',
          name: '类型',
          type: 'select',
          default: 'line',
          comProps: {
            options: [
              {
                label: '折线图',
                value: 'line',
              },
              {
                label: '柱状图',
                value: 'bar',
              },
            ],
          },
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
  // dataTemplate: {
  //   min: 0,
  //   max: 100,
  //   x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   y: [
  //     {
  //       name: 'Email',
  //       data: [120, 132, 101, 134, 90, 230, 210],
  //     },
  //     {
  //       name: 'Union Ads',
  //       data: [220, 182, 191, 234, 290, 330, 310],
  //     },
  //     {
  //       name: 'Video Ads',
  //       data: [150, 232, 201, 154, 190, 330, 410],
  //     },
  //     {
  //       name: 'Direct',
  //       data: [320, 332, 301, 334, 390, 330, 320],
  //     },
  //     {
  //       name: 'Search Engine',
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //     },
  //   ],
  // },
};

export default BasicLineChartTemplate;
