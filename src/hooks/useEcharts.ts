import * as echarts from 'echarts';
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { useSize, useMount, useUpdateEffect } from 'ahooks';
import { throttle } from 'lodash';

function useECharts(ref: RefObject<HTMLElement>, option: Record<string, any>) {
  const chartInstanceRef = useRef<echarts.ECharts>();

  useMount(() => {
    console.log('ref.current', ref.current);
    chartInstanceRef.current = echarts.init(ref.current as HTMLElement);
  });

  useUpdateEffect(() => {
    chartInstanceRef.current!.setOption(option, {
      notMerge: true,
    });
  }, [option]);

  const size = useSize(ref);
  useEffect(() => {
    const resize = throttle(() => chartInstanceRef.current?.resize(), 200);
    if (chartInstanceRef.current) {
      resize();
    }
  }, [size]);
}

export default useECharts;
