import { templateMap } from '@/layers';
import type { LayerTemplate } from '@/layers/typing';
import { Tabs } from 'antd';
import type { ReactNode } from 'react';
import React from 'react';
import IconFont from '@/components/IconFont';
import styles from './index.less';

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
  const handleDragStart = (e: React.DragEvent, template: LayerTemplate) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(template));
    // TODO: dropEffect的区别是什么
    // e.dataTransfer.dropEffect = 'move';
    // e.dataTransfer.setDragImage()
  };

  return (
    <Tabs tabPosition="left" type="card" className={styles.wrapper} tabBarGutter={0}>
      {libs.map((lib) => (
        <TabPane
          tab={lib.icon}
          // tab={<span style={{ writingMode: 'vertical-lr' }}>{lib.name}</span>}
          key={lib.name}
        >
          {lib.children.map((item) => (
            <div
              key={item.type}
              draggable
              style={{ height: 50, border: '1px solid red' }}
              onDragStart={(e) => handleDragStart(e, item)}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default ComponentLib;
