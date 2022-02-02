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
    const { url, method = 'get', headers, params } = dataSource;

    if (!url) {
      return null;
    }

    const options = {
      method,
      headers: {},
      params: {},
      data: '',
      errorHandler: () => null,
    };

    if (headers) {
      options.headers = headers;
    }

    if (params) {
      if (method === 'get') {
        options.params = params;
      } else if (method === 'post') {
        options.data = params;
      }
    }
    const res = await request(url, options);
    return res.code === 0 ? res.data : null;
  }

  return null;
}

function useDataSource(dataSource: DataSource) {
  const { data, run } = useRequest(getData, {
    manual: true,
    // @ts-ignore
    pollingInterval: (dataSource.refreshInterval || 5) * 1000,
  });

  useEffect(() => {
    run(dataSource);
  }, [dataSource, run]);

  return data;
}

export default useDataSource;
