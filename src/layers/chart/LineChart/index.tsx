import useDataSource from '@/hooks/useDataSource';
import useECharts from '@/hooks/useEcharts';
import type { LayerConfig } from '@/layers/typing';
import type * as echarts from 'echarts';
import { at } from 'lodash';
import { useRef } from 'react';

const LineChart: React.FC<LayerConfig> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { view, dataSource, configValues } = props;
  const { dcFields } = dataSource;

  const xField = dcFields.x || 'x';
  const yField = dcFields.y || 'y';

  const data = useDataSource(dataSource);

  const option: echarts.EChartsOption = {
    series: configValues.series.map((s: any, index: number) => ({
      type: 'line',
      // type: s.type,
      name: s.name,
      data: at(data, `${yField}[${index}]`) || [],
    })),
    xAxis: {
      show: configValues.xAxisShow,
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      splitLine: {
        show: configValues.xAxisSplitLineShow,
      },
      data: at(data, `${xField}`) || [],
    },
    yAxis: {
      type: 'value',
      show: configValues.yAxisShow,
      splitLine: {
        show: configValues.yAxisSplitLineShow,
      },
    },
    tooltip: { trigger: 'axis' },
  };

  useECharts(containerRef, option);

  console.log(data);

  console.log('configValues', configValues);
  console.log('data', data);

  return (
    <div
      ref={containerRef}
      style={{
        width: view.width,
        height: view.height,
        backgroundColor: configValues.backgroundColor,
      }}
    />
  );
};

export default LineChart;
