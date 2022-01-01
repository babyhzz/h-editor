import { LayerConfig, LayerTemplate } from '@/layers/typing';
import { Tabs } from 'antd';
import styles from './index.less';
import { templateMap } from '@/layers';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { FormConfig } from '@/components/FormRenderer';
const { TabPane } = Tabs;

type LibType = 'text' | 'chart';
type Libs = Array<{
  name: string;
  children: Array<LayerTemplate>;
}>;

const libs: Libs = [
  {
    name: '文本',
    children: [templateMap.BasicTitle],
  },
  {
    name: '图表',
    children: [],
  },
];

function randomString() {
  return Math.random().toString(36).substring(9);
}

function getDefaultValues(config: FormConfig): Record<string, any> {
  return config.reduce((preValues, item) => {
    if (item.type === 'group') {
      return { ...preValues, ...getDefaultValues(item.children) };
    } else {
      return { ...preValues, [item.key]: item.default };
    }
  });
}

function getLayerConfigFromTemplate(template: LayerTemplate): LayerConfig {
  return {
    ...template,
    id: `${template.type}-${randomString()}`,
    view: {
      w: template.width,
      h: template.height,
      x: 0,
      y: 0,
      opacity: 1,
    },
    configValues: getDefaultValues(template.config),
    alias: template.name,
    dataSource: {
      type: 'static',
      data: template.dataTemplate,
    },
  };
}

interface EditorProps {
  layers: Array<LayerConfig>;
  selected: string;
  dispatch: Dispatch;
}

const Editor: React.FC<EditorProps> = (props) => {
  const handleDragStart = (e: React.DragEvent, template: LayerTemplate) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(template));
    // TODO: dropEffect的区别是什么
    // e.dataTransfer.dropEffect = 'move';
    // e.dataTransfer.setDragImage()
  };

  const handleDrop = (e: React.DragEvent) => {
    const template = JSON.parse(e.dataTransfer.getData('text/plain'));
    const layer = getLayerConfigFromTemplate(template);

    const { dispatch } = props;
    dispatch({ type: 'editor/addLayer', payload: layer });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        <div className={styles.lib}>
          <Tabs tabPosition="left">
            {libs.map((lib) => (
              <TabPane
                tab={
                  <span style={{ writingMode: 'vertical-lr' }}>{lib.name}</span>
                }
                key={lib.name}
              >
                {lib.children.map((item) => (
                  <div
                    style={{ height: 100, border: '1px solid red' }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </TabPane>
            ))}
          </Tabs>
        </div>
        <div className={styles.canvas}>
          <div
            className={styles.board}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          ></div>
        </div>
        <div className={styles.config}></div>
      </div>
    </div>
  );
};

export default connect((state: any) => ({
  layers: state.layers,
  selected: state.selected,
}))(Editor);
