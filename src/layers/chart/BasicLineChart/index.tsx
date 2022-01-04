import useDataSource from '@/hooks/useDataSource';
import useECharts from '@/hooks/useEcharts';
import { LayerConfig } from '@/layers/typing';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';

const BasicLineChart: React.FC<LayerConfig> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { view, dataSource, configValues } = props;

  const data = useDataSource(dataSource);
  const { dcFields } = dataSource;

  const option: echarts.EChartsOption = {
    dataset: {
      dimensions: [dcFields['x'] || 'x', dcFields['y'] || 'y'],
      source: data,
    },
    series: {
      type: 'line',
    },
    xAxis: {
      show: configValues.xAxisShow,
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
    },
    tooltip: { trigger: 'axis' },
  };

  useECharts(containerRef, option, view.width, view.height);

  return (
    <div
      ref={containerRef}
      style={{
        width: view.width,
        height: view.height,
        backgroundColor: configValues.backgroundColor,
      }}
    ></div>
  );
};

export default BasicLineChart;
