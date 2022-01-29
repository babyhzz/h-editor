import type { BoardConfig, LayerConfig, LayerTemplate } from '@/layers/typing';
import { DisplayMode } from '@/layers/typing';
import { useDrop } from 'ahooks';
import { Slider } from 'antd';
import type { MouseEventHandler } from 'react';
import React, { useEffect, useRef } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import ComponentLib from './ComponentLib';
import ConfigPanel from './ConfigPanel';
import DragResizeItem from './DragResizeItem';
import HeaderTool from './HeaderTool';
import styles from './index.less';
import LayerList from './LayerList';
import { getLayerConfigFromTemplate } from './utils';

interface EditorProps {
  layers: LayerConfig[];
  board: BoardConfig;
  dispatch: Dispatch;
  showLayerList: boolean;
  showConfigPanel: boolean;
  showLibs: boolean;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { layers, board, dispatch } = props;

  const dropRef = useRef<HTMLDivElement>(null);

  useDrop(dropRef, {
    onDom: (template: LayerTemplate, e?: React.DragEvent) => {
      const layer = getLayerConfigFromTemplate(e!, template, board.width, board.height);
      dispatch({ type: 'editor/addLayer', payload: layer });
    },
  });

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

  const updateBoard = (bc: Partial<BoardConfig>) => {
    dispatch({ type: 'editor/updateBoard', payload: bc });
  };

  const handleScaleChange = (value: number) => {
    updateBoard({ scale: value / 100 });
  };

  const handleBoardClick: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'editor/selectBoard' });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        {/* <div className={styles.scale}>
          <Slider value={board.scale * 100} onChange={handleScaleChange} />
        </div> */}
        <HeaderTool />
      </div>
      <div className={styles.content}>
        {props.showLayerList && (
          <div className={styles.layer}>
            <LayerList />
          </div>
        )}
        {props.showLibs && (
          <div className={styles.lib}>
            <ComponentLib />
          </div>
        )}
        <div className={styles.workspaceContainer}>
          <div
            className={styles.workspace}
            style={{
              width: (board?.width || 0) * (board.scale || 1),
              height: (board?.height || 0) * (board.scale || 1),
            }}
          >
            <div
              className={styles.board}
              ref={dropRef}
              style={{
                width: board?.width,
                height: board?.height,
                transform: `scale(${board.scale}, ${board.scale})`,
                backgroundImage: `url(${board?.backgroundImage})`,
              }}
              onClick={handleBoardClick}
            >
              {layers.map((layer) => (
                <DragResizeItem key={layer.id} layer={layer} />
              ))}
            </div>
          </div>
        </div>
        {props.showConfigPanel && (
          <div className={styles.config}>
            <ConfigPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default connect((state: any) => ({
  layers: state.editor.layers,
  board: state.editor.board,
  showLayerList: state.editor.showLayerList,
  showConfigPanel: state.editor.showConfigPanel,
  showLibs: state.editor.showLibs,
}))(Editor);
