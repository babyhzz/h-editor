import type { DataSource } from '@/layers/typing';
import { useRequest } from 'ahooks';
import request from 'umi-request';

async function getData(dataSource: DataSource) {
  console.log('dataSource', dataSource);
  if (dataSource.type === 'static') {
    try {
      return Promise.resolve(JSON.parse(dataSource.data));
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
  const interval =
    dataSource.type === 'api' ? (dataSource.refreshInterval || 5) * 1000 : Number.MAX_SAFE_INTEGER;

  const { data } = useRequest(() => getData(dataSource), {
    pollingInterval: interval,
    // pollingWhenHidden: false,
    refreshDeps: [dataSource],
  });

  return data;
}

export default useDataSource;
