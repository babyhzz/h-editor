import { templateMap } from '@/layers';
import type { LayerTemplate } from '@/layers/typing';
import { Tabs } from 'antd';
import type { ReactNode } from 'react';
import React from 'react';
import IconFont from '@/components/IconFont';
import styles from './index.less';
import ComponentThumb from './ComponentThumb';

const { TabPane } = Tabs;

type Lib = {
  name: string;
  icon: ReactNode;
  children: LayerTemplate[];
};

const libs: Lib[] = [
  {
    name: '信息',
    icon: <IconFont type="icon-lib_info" style={{ color: 'red' }} />,
    children: [templateMap.BasicTitle],
  },
  {
    name: '图表',
    icon: <IconFont type="icon-lib_chart" />,
    children: [templateMap.BasicLineChart],
  },
];

const ComponentLib: React.FC = () => {
  return (
    <Tabs tabPosition="left" type="card" className={styles.wrapper} tabBarGutter={0}>
      {libs.map((lib) => (
        <TabPane tab={lib.icon} key={lib.name}>
          {lib.children.map((item) => (
            <ComponentThumb template={item} key={item.type} />
          ))}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default ComponentLib;
