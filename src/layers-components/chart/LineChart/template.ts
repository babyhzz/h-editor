const template: ComponentTemplate = {
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
          key: 'smooth',
          name: '平滑',
          type: 'switch',
          default: false,
        },
        {
          key: 'labelShow',
          name: '文本标签',
          type: 'switch',
          default: false,
        },
        {
          key: 'labelDistance',
          name: '标签距离',
          type: 'number',
          default: 5,
        },
        // 折线柱状图配置项不一样
        // {
        //   key: 'type',
        //   name: '类型',
        //   type: 'select',
        //   default: 'line',
        //   comProps: {
        //     options: [
        //       {
        //         label: '折线图',
        //         value: 'line',
        //       },
        //       {
        //         label: '柱状图',
        //         value: 'bar',
        //       },
        //     ],
        //   },
        // },
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
};

export default template;
