import * as echarts from 'echarts';
import { RefObject, useEffect, useRef } from 'react';
import { useThrottleFn } from 'ahooks';
import { debounce, throttle } from 'lodash';

function useECharts(
  ref: RefObject<HTMLElement>,
  option: Record<string, any>,
  width: number,
  height: number,
) {
  const chartRef = useRef<echarts.ECharts>();
  console.log('option', option);
  useEffect(() => {
    chartRef.current = echarts.init(ref.current as HTMLElement);
    chartRef.current.setOption(option);
  }, [ref.current]);

  useEffect(() => {
    if (chartRef.current) {
      // chartRef.current.clear();
      chartRef.current.setOption(option);
    }
  }, [option]);

  const { run } = useThrottleFn(() => chartRef.current?.resize(), {
    wait: 100,
  });

  useEffect(() => {
    const resize = throttle(() => chartRef.current?.resize(), 200);
    resize();
  }, [width, height, chartRef.current]);
}

export default useECharts;
