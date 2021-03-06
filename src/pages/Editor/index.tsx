import React, { useEffect } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import ComponentLib from './ComponentLib';
import ConfigPanel from './ConfigPanel';
import HeaderTool from './HeaderTool';
import styles from './index.less';
import LayerList from './LayerList';
import Workspace from './Workspace';

interface EditorProps {
  board: BoardConfig;
  dispatch: Dispatch;
  showLayerList: boolean;
  showConfigPanel: boolean;
  showLibs: boolean;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { board, dispatch } = props;

  // 初始化board参数
  useEffect(() => {
    if (!board || !board.width || !board.height) {
      const payload: BoardConfig = {
        width: 1920,
        height: 1080,
        grid: 8,
        display: 1,
        scale: 1,
      };
      dispatch({ type: 'editor/initBoard', payload });
    }
  }, [dispatch, board]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
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
          <Workspace />
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
  board: state.editor.board,
  showLayerList: state.editor.showLayerList,
  showConfigPanel: state.editor.showConfigPanel,
  showLibs: state.editor.showLibs,
}))(Editor);
