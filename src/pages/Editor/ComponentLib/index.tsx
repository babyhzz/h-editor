import { templateGroup } from '@/layers';
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
  children: ComponentTemplate[];
};

const libs: Lib[] = [
  {
    name: '信息',
    icon: <IconFont type="icon-cat-info" />,
    children: templateGroup.info,
  },
  {
    name: '图表',
    icon: <IconFont type="icon-cat-chart" />,
    children: templateGroup.chart,
  },
  {
    name: '媒体',
    icon: <IconFont type="icon-cat-media" />,
    children: templateGroup.media,
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
