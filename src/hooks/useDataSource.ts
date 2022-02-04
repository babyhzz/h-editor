import type { DataSource } from '@/layers/typing';
import { useRequest } from 'ahooks';
import { useEffect, useRef } from 'react';
import request from '@/utils/request';

async function getData(dataSource: DataSource, commonHeaders: Record<string, any>) {
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
      data: {},
    };

    if (commonHeaders) {
      options.headers = commonHeaders || {};
    }

    if (headers) {
      options.headers = { ...options.headers, ...headers };
    }

    if (params) {
      if (method === 'get') {
        options.params = params;
      } else if (method === 'post') {
        options.data = params;
      }
    }
    const res = await request(url, options);
    return res && res.code === 0 ? res.data : null;
  }

  return null;
}

function useDataSource(dataSource: DataSource, commonHeaders: Record<string, any>) {
  const { data, run } = useRequest(getData, {
    manual: true,
    // @ts-ignore
    pollingInterval: (dataSource.refreshInterval || 5) * 1000,
  });

  useEffect(() => {
    run(dataSource, commonHeaders);
  }, [dataSource, commonHeaders, run]);

  return data;
}

export default useDataSource;
