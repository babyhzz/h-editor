import type { DataSource } from '@/layers/typing';
import { useRequest } from 'ahooks';
import { useEffect, useRef } from 'react';
import request from 'umi-request';

async function getData(dataSource: DataSource) {
  if (dataSource.type === 'static') {
    try {
      return dataSource.data;
    } catch {
      return null;
    }
  }

  if (dataSource.type === 'api') {
    const { apiUrl, apiMethod = 'get', apiHeaders, apiData } = dataSource;

    if (!apiUrl) {
      return null;
    }

    const options = {
      method: apiMethod,
      headers: {},
      params: {},
      data: '',
      errorHandler: () => null,
    };

    if (apiHeaders) {
      options.headers = JSON.parse(apiHeaders);
    }

    if (apiData) {
      if (apiMethod === 'get') {
        options.params = JSON.parse(apiData);
      } else if (apiMethod === 'post') {
        options.data = JSON.parse(apiData);
      }
    }
    const res = await request(apiUrl, options);
    return res.code === 0 ? res.data : null;
  }

  return null;
}

function useDataSource(dataSource: DataSource) {
  const intervalId = useRef<number>();
  const { data, run } = useRequest(getData, {
    refreshOnWindowFocus: true,
    manual: true,
  });

  useEffect(() => {
    run(dataSource);
  }, [dataSource, run]);

  if (dataSource.type === 'api') {
    clearInterval(intervalId.current);
    setInterval(() => run(dataSource), (dataSource.refreshInterval || 5) * 1000);
  }

  return data;
}

export default useDataSource;
