import useECharts from '@/hooks/useEcharts';
import { LayerConfig } from '@/layers/typing';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';

const BasicLineChart: React.FC<LayerConfig> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { view, dataSource } = props;

  const [data, setData] = useState(dataSource.data);

  useEffect(() => {
    setData(dataSource.data);
  }, [dataSource]);

  // if (dataSource.type === 'static') {

  // }
  const option: echarts.EChartsOption = {
    dataset: {
      dimensions: ['x', 'y'],
      source: data,
    },
    series: {
      type: 'line',
    },
    xAxis: { type: 'category' },
    yAxis: {},
  };

  useECharts(containerRef, option, view.width, view.height);

  return (
    <div ref={containerRef} style={{ width: view.width, height: view.height }}>
      BasicLineChart
    </div>
  );
};

export default BasicLineChart;
