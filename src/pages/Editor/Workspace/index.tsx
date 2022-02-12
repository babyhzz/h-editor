import { useDrop } from 'ahooks';
import type { MouseEventHandler } from 'react';
import React, { useRef } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import DragResizeItem from './DragResizeItem';
import styles from './index.less';
import { getLayerConfigFromTemplate } from './utils';

interface WorkspaceProps {
  layers: LayerConfig[];
  board: BoardConfig;
  dispatch: Dispatch;
}

const Workspace: React.FC<WorkspaceProps> = (props) => {
  const { board, layers, dispatch } = props;

  const dropRef = useRef<HTMLDivElement>(null);

  useDrop(dropRef, {
    onDom: (template: ComponentTemplate, e?: React.DragEvent) => {
      const layer = getLayerConfigFromTemplate(e!, template, board.width, board.height);
      dispatch({ type: 'editor/addLayer', payload: layer });
    },
  });

  const handleBoardClick: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'editor/selectBoard' });
    }
  };

  return (
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
  );
};
export default connect((state: any) => ({
  layers: state.editor.layers,
  board: state.editor.board,
}))(Workspace);
