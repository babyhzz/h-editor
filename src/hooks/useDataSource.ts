import { DataSource } from '@/layers/typing';
import { useRequest } from 'ahooks';
import { memo, useEffect, useState } from 'react';
import request from 'umi-request';

async function getData(dataSource: DataSource) {
  if (dataSource.type === 'static') {
    try {
      return Promise.resolve(JSON.parse(dataSource.data));
    } catch {
      return [];
    }
  }

  if (dataSource.type === 'api') {
    const { apiUrl, apiMethod = 'get', apiHeaders, apiData } = dataSource;

    if (!apiUrl) {
      return [];
    }

    const options = {
      method: apiMethod,
      headers: {},
      params: {},
      data: '',
      errorHandler: () => [],
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
    // console.log('apiDat a return request');
    const res = await request(apiUrl, options);
    return res.code === 0 ? res.data : [];
  }

  return [];
}

function useDataSource(dataSource: DataSource) {
  const interval =
    dataSource.type === 'api' ? (dataSource.refreshInterval || 5) * 1000 : 3600 * 1000;

  const { data } = useRequest(() => getData(dataSource), {
    pollingInterval: interval,
    // pollingWhenHidden: false,
    refreshDeps: [dataSource],
  });

  // console.log('apiData return data====', data);
  return data || [];
}

export default useDataSource;
