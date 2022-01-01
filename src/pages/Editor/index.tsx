import { LayerConfig, LayerTemplate } from '@/layers/typing';
import { Tabs } from 'antd';
import styles from './index.less';
import { componentMap, templateMap } from '@/layers';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { FormConfig } from '@/components/FormRenderer';
import {
  DraggableData,
  Position,
  Rnd,
  RndDragCallback,
  RndResizeCallback,
} from 'react-rnd';

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
      width: template.width,
      height: template.height,
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
  const { layers, selected, dispatch } = props;

  const handleDragStart = (e: React.DragEvent, template: LayerTemplate) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(template));
    // TODO: dropEffect的区别是什么
    // e.dataTransfer.dropEffect = 'move';
    // e.dataTransfer.setDragImage()
  };

  const handleDrop: React.DragEventHandler = (e) => {
    const template = JSON.parse(e.dataTransfer.getData('text/plain'));
    const layer = getLayerConfigFromTemplate(template);

    dispatch({ type: 'editor/addLayer', payload: layer });
  };

  const handleRndDragStart = (layer: LayerConfig) => {
    dispatch({ type: 'editor/selectLayer', payload: layer.id });
  };

  const handleRndDragStop = (data: DraggableData, layer: LayerConfig) => {
    const { x, y } = data;
    dispatch({
      type: 'editor/updateLayerView',
      payload: {
        id: layer.id,
        view: { ...layer.view, x, y },
      },
    });
  };

  const handleRndResize = (
    ref: HTMLElement,
    position: Position,
    layer: LayerConfig,
  ) => {
    const { x, y } = position;
    const width = parseInt(ref.style.width);
    const height = parseInt(ref.style.height);

    dispatch({
      type: 'editor/updateLayerView',
      payload: {
        id: layer.id,
        view: { ...layer.view, x, y, width, height },
      },
    });
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
          >
            {layers.map((l) => {
              const {
                type,
                view: { width, height, opacity, x, y },
              } = l;
              const DynamicComponent = componentMap[type];
              return (
                <Rnd
                  style={{ opacity }}
                  size={{ width, height }}
                  position={{ x, y }}
                  onDragStart={() => handleRndDragStart(l)}
                  onDragStop={(e, data) => handleRndDragStop(data, l)}
                  onResize={(e, d, ref, delta, position) =>
                    handleRndResize(ref, position, l)
                  }
                >
                  <DynamicComponent {...l} />
                </Rnd>
              );
            })}
          </div>
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
