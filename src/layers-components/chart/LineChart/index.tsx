import useECharts from '@/hooks/useEcharts';
import type * as echarts from 'echarts';
import { get } from 'lodash';
import { useRef } from 'react';

const LineChart: LayerComponent = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height, comProps, data } = props;

  const option: echarts.EChartsOption = {
    series: comProps.series.map((s: any, index: number) => ({
      type: 'line',
      name: get(data, `y[${index}].name`),
      data: get(data, `y[${index}].data`) || [],
      smooth: s.smooth,
      label: {
        show: s.labelShow,
        distance: s.labelDistance,
      },
    })),
    xAxis: {
      show: comProps.xAxisShow,
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      splitLine: {
        show: comProps.xAxisSplitLineShow,
      },
      data: get(data, 'x') || [],
    },
    yAxis: {
      type: 'value',
      show: comProps.yAxisShow,
      splitLine: {
        show: comProps.yAxisSplitLineShow,
      },
    },
    tooltip: { trigger: 'axis' },
  };

  useECharts(containerRef, option);
  return (
    <div
      ref={containerRef}
      style={{
        width: width,
        height: height,
        backgroundColor: comProps.backgroundColor,
      }}
    />
  );
};

export default LineChart;
