const data = {
  x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  y: [
    {
      name: 'Email',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

/** 根据配置获取静态数据 */
const getStaticData = (configValues: any): any => {
  const seriesLength = configValues.series.length;

  return { ...data, y: data.y.slice(0, seriesLength) };
};

const type = 'BarChart';
export { type, data, getStaticData };
