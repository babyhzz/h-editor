import {
  BoardConfig,
  DisplayMode,
  LayerConfig,
  LayerTemplate,
  LayerViewConfig,
} from '@/layers/typing';
import { Tabs } from 'antd';
import styles from './index.less';
import { componentMap, templateMap } from '@/layers';
import React, { DragEvent, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import FormRenderer, { FormConfig } from '@/components/FormRenderer';
import { DraggableData, Position, Rnd } from 'react-rnd';
import DataSourceForm from './DataSourceForm';

/** Resize按钮的尺寸大小 */
const handleSize = 6;

const handleCommonStyle = {
  width: handleSize,
  height: handleSize,
  backgroundColor: '#2321DD',
  borderRadius: '50%',
};

const handleStyles = {
  topLeft: {
    ...handleCommonStyle,
    left: -handleSize / 2,
    top: -handleSize / 2,
  },
  topRight: {
    ...handleCommonStyle,
    right: -handleSize / 2,
    top: -handleSize / 2,
  },
  bottomLeft: {
    ...handleCommonStyle,
    left: -handleSize / 2,
    bottom: -handleSize / 2,
  },
  bottomRight: {
    ...handleCommonStyle,
    right: -handleSize / 2,
    bottom: -handleSize / 2,
  },
  top: {
    ...handleCommonStyle,
    left: `calc(50% - ${handleSize / 2}px)`,
    top: -handleSize / 2,
    cursor: 'n-resize',
  },
  bottom: {
    ...handleCommonStyle,
    left: `calc(50% - ${handleSize / 2}px)`,
    bottom: -handleSize / 2,
    cursor: 'n-resize',
  },
  left: {
    ...handleCommonStyle,
    left: -handleSize / 2,
    top: `calc(50% - ${handleSize / 2}px)`,
    cursor: 'w-resize',
  },
  right: {
    ...handleCommonStyle,
    right: -handleSize / 2,
    top: `calc(50% - ${handleSize / 2}px)`,
    cursor: 'w-resize',
  },
};

const { TabPane } = Tabs;

type LibType = 'text' | 'chart';
type Libs = Array<{
  name: string;
  children: Array<LayerTemplate>;
}>;

const libs: Libs = [
  {
    name: '信息',
    children: [templateMap.BasicTitle],
  },
  {
    name: '图表',
    children: [templateMap.BasicLineChart],
  },
];

const viewConfig: FormConfig = [
  {
    key: 'width',
    name: '宽度',
    type: 'number',
  },
  {
    key: 'height',
    name: '高度',
    type: 'number',
  },
  {
    key: 'x',
    name: 'x坐标',
    type: 'number',
  },
  {
    key: 'y',
    name: 'y坐标',
    type: 'number',
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
  }, {});
}

function getLayerConfigFromTemplate(
  template: LayerTemplate,
  e: DragEvent,
): LayerConfig {
  const { offsetX, offsetY } = e.nativeEvent;
  return {
    ...template,
    id: `${template.type}-${randomString()}`,
    view: {
      width: template.width,
      height: template.height,
      x: offsetX - template.width / 2,
      y: offsetY - template.height / 2,
      opacity: 1,
    },
    configValues: getDefaultValues(template.config),
    alias: template.name,
    dataSource: {
      type: 'static',
      data: JSON.stringify(template.dataTemplate, null, 2),
      dcFields: {},
    },
  };
}

interface EditorProps {
  layers: Array<LayerConfig>;
  selectedLayer: LayerConfig | null;
  board: BoardConfig;
  dispatch: Dispatch;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { layers, selectedLayer, board, dispatch } = props;

  // 初始化board参数
  useEffect(() => {
    const board: BoardConfig = {
      width: 900,
      height: 600,
      grid: 8,
      display: DisplayMode.FULL_SCREEN,
    };
    dispatch({ type: 'editor/initBoard', payload: board });
  }, []);

  const handleDragStart = (e: React.DragEvent, template: LayerTemplate) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(template));
    // TODO: dropEffect的区别是什么
    // e.dataTransfer.dropEffect = 'move';
    // e.dataTransfer.setDragImage()
  };

  const handleDrop: React.DragEventHandler = (e) => {
    const template = JSON.parse(e.dataTransfer.getData('text/plain'));
    const layer = getLayerConfigFromTemplate(template, e);

    dispatch({ type: 'editor/addLayer', payload: layer });
  };

  const handleRndDragStart = (layer: LayerConfig) => {
    dispatch({ type: 'editor/selectLayer', payload: layer.id });
  };

  const handleRndDragStop = (data: DraggableData, layer: LayerConfig) => {
    const { x, y } = data;
    updateView({ x, y });
  };

  const handleRndResize = (
    ref: HTMLElement,
    position: Position,
    layer: LayerConfig,
  ) => {
    const { x, y } = position;
    const width = parseInt(ref.style.width);
    const height = parseInt(ref.style.height);
    updateView({ x, y, width, height });
  };

  const updateView = (view: Partial<LayerViewConfig>) => {
    dispatch({
      type: 'editor/updateLayerView',
      payload: { view },
    });
  };

  const handleConfigChange = (values: any) => {
    dispatch({
      type: 'editor/updateLayerConfig',
      payload: values,
    });
  };

  const handleViewChange = (values: any) => {
    dispatch({
      type: 'editor/updateLayerView',
      payload: values,
    });
  };

  const handleDataSourceChange = (values: any) => {
    dispatch({
      type: 'editor/updateLayerDataSource',
      payload: values,
    });
  };

  console.log('layers', layers);

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
        </div>
        <div className={styles.canvas}>
          <div className={styles.inner}>
            <div
              className={styles.board}
              style={{ width: board?.width, height: board?.height }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {layers.map((l) => {
                const {
                  id,
                  type,
                  view: { width, height, opacity, x, y },
                } = l;
                const DynamicComponent = componentMap[type];
                return (
                  <Rnd
                    key={id}
                    style={{ opacity }}
                    size={{ width, height }}
                    position={{ x, y }}
                    onDragStart={() => handleRndDragStart(l)}
                    onDragStop={(e, data) => handleRndDragStop(data, l)}
                    onResize={(e, d, ref, delta, position) =>
                      handleRndResize(ref, position, l)
                    }
                    bounds="parent"
                    resizeHandleStyles={handleStyles}
                    enableResizing={selectedLayer?.id === l.id}
                  >
                    <DynamicComponent {...l} />
                  </Rnd>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.config}>
          {}
          {selectedLayer ? (
            <Tabs
              defaultActiveKey="1"
              className={styles.configTabs}
              tabPosition="top"
              animated={false}
            >
              <TabPane tab="配置" key="config">
                <FormRenderer
                  key="view"
                  config={viewConfig}
                  value={selectedLayer.view}
                  onChange={handleViewChange}
                />
                <FormRenderer
                  key="config"
                  config={selectedLayer.config}
                  value={selectedLayer.configValues}
                  onChange={handleConfigChange}
                />
              </TabPane>
              <TabPane tab="数据" key="data">
                <DataSourceForm
                  value={selectedLayer.dataSource}
                  dataFields={selectedLayer.dataFields}
                  onChange={handleDataSourceChange}
                />
              </TabPane>
              <TabPane tab="交互" key="event">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default connect((state: any) => {
  const { layers, selected, board } = state.editor;
  const selectedLayer = layers.find((l: LayerConfig) => l.id === selected);

  return { layers, selectedLayer, board };
})(Editor);
