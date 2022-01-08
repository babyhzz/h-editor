import type { BoardConfig, LayerConfig, LayerTemplate, LayerViewConfig } from '@/layers/typing';
import { DisplayMode } from '@/layers/typing';
import { Slider, Tabs } from 'antd';
import styles from './index.less';
import { componentMap } from '@/layers';
import type { DragEvent } from 'react';
import React, { useEffect } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { FormConfig } from '@/components/FormRenderer';
import FormRenderer from '@/components/FormRenderer';
import type { DraggableData, Position } from 'react-rnd';
import { Rnd } from 'react-rnd';
import DataSourceForm from './DataSourceForm';
import { boardConfig, handleStyles, viewConfig } from './utils';
import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import ComponentLib from './ComponentLib';

const { TabPane } = Tabs;

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

function getLayerConfigFromTemplate(template: LayerTemplate, e: DragEvent): LayerConfig {
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
  layers: LayerConfig[];
  selectedLayer: LayerConfig | null;
  board: BoardConfig;
  dispatch: Dispatch;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { layers, selectedLayer, board, dispatch } = props;

  // 初始化board参数
  useEffect(() => {
    const payload: BoardConfig = {
      width: 1920,
      height: 1080,
      grid: 8,
      display: DisplayMode.FULL_SCREEN,
      scale: 0.5,
    };
    dispatch({ type: 'editor/initBoard', payload });
  }, [dispatch]);

  const handleDrop: React.DragEventHandler = (e) => {
    const template = JSON.parse(e.dataTransfer.getData('text/plain'));
    const layer = getLayerConfigFromTemplate(template, e);

    dispatch({ type: 'editor/addLayer', payload: layer });
  };

  const handleRndDragStart = (layer: LayerConfig) => {
    dispatch({ type: 'editor/selectLayer', payload: layer });
  };

  const updateView = (view: Partial<LayerViewConfig>) => {
    dispatch({
      type: 'editor/updateLayerView',
      payload: view,
    });
  };

  const updateBoard = (bc: Partial<BoardConfig>) => {
    dispatch({ type: 'editor/updateBoard', payload: bc });
  };

  const handleRndDragStop = (data: DraggableData, layer: LayerConfig) => {
    const { x, y } = data;
    updateView({ x, y });
  };

  const handleRndResize = (ref: HTMLElement, position: Position, layer: LayerConfig) => {
    const { x, y } = position;
    const width = parseInt(ref.style.width);
    const height = parseInt(ref.style.height);
    updateView({ x, y, width, height });
  };

  const handleConfigChange = (values: any) => {
    dispatch({
      type: 'editor/updateLayerConfig',
      payload: values,
    });
  };

  const handleViewChange = (values: any) => {
    updateView(values);
  };

  const handleDataSourceChange = (values: any) => {
    dispatch({
      type: 'editor/updateLayerDataSource',
      payload: values,
    });
  };

  const handleScaleChange = (value: number) => {
    updateBoard({ scale: value / 100 });
  };

  const handleBoardChange = (values: any) => {
    updateBoard(values);
  };

  const handleBoardClick: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'editor/selectBoard' });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.scale}>
          <Slider value={board.scale * 100} onChange={handleScaleChange} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.lib}>
          <ComponentLib />
        </div>
        <div className={styles.workspaceContainer}>
          <div
            className={styles.workspace}
            style={{
              width: (board?.width || 0) * board.scale,
              height: (board?.height || 0) * board.scale,
            }}
          >
            <div
              className={styles.board}
              style={{
                width: board?.width,
                height: board?.height,
                transform: `scale(${board.scale}, ${board.scale})`,
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={handleBoardClick}
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
                    onResize={(e, d, ref, delta, position) => handleRndResize(ref, position, l)}
                    bounds="parent"
                    resizeHandleStyles={handleStyles}
                    enableResizing={selectedLayer?.id === l.id}
                    scale={board.scale}
                    resizeHandleWrapperClass={classNames(styles.handleWrapperClass, {
                      [styles.handleWrapperActive]: selectedLayer?.id === l.id,
                    })}
                  >
                    <DynamicComponent {...l} />
                  </Rnd>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.config}>
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
          ) : (
            <FormRenderer
              key="view"
              config={boardConfig}
              value={board}
              onChange={handleBoardChange}
            />
          )}
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
