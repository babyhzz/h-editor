import { componentMap } from '@/layers';
import type { BoardConfig, LayerViewConfig } from '@/layers/typing';
import type { LayerConfig } from '@/layers/typing';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import type { DraggableData, Position } from 'react-rnd';
import { Rnd } from 'react-rnd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import styles from './index.less';
import { handleStyles } from './handleStyles';
import { Menu, Dropdown } from 'antd';

interface DragResizeItemProps {
  layer: LayerConfig;
  selectedId: string | null;
  board: BoardConfig;
  dispatch: Dispatch;
}

const DragResizeItem: React.FC<DragResizeItemProps> = (props) => {
  const { layer, selectedId, board, dispatch } = props;

  const { id, comName, width, height, opacity, x, y } = layer;

  const active = selectedId === id;
  const scale = board.scale;

  const DynamicComponent = useMemo(() => componentMap[comName], [comName]);

  const handleRndDragStart = () => {
    dispatch({ type: 'editor/selectLayer', payload: layer });
  };

  const updateView = (view: Partial<LayerViewConfig>) => {
    dispatch({
      type: 'editor/updateLayerView',
      payload: view,
    });
  };

  const handleRndDragStop = (data: DraggableData) => {
    updateView({ x: Math.round(data.x), y: Math.round(data.y) });
  };

  const handleRndResize = (ref: HTMLElement, position: Position) => {
    updateView({
      x: Math.round(position.x),
      y: Math.round(position.y),
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    });
  };

  const deleteLayer = () => {
    dispatch({ type: 'editor/deleteLayer', payload: layer });
  };

  const menu = (
    <Menu style={{ width: 120 }}>
      <Menu.Item key="delete" onClick={deleteLayer}>
        删除
      </Menu.Item>
    </Menu>
  );

  const resizeHandleStyles = useMemo(() => handleStyles(scale), [scale]);

  return (
    <Rnd
      key={id}
      style={{ opacity }}
      size={{ width, height }}
      position={{ x, y }}
      onDragStart={() => handleRndDragStart()}
      onDragStop={(e, data) => handleRndDragStop(data)}
      onResize={(e, d, ref, delta, position) => handleRndResize(ref, position)}
      bounds="parent"
      resizeHandleStyles={resizeHandleStyles}
      enableResizing={active}
      scale={scale}
      // dragGrid={[board.grid, board.grid]}
      // resizeGrid={[board.grid, board.grid]}
    >
      <DynamicComponent {...layer} board={board} />
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div
          className={classNames(styles.handleWrapperClass, {
            [styles.handleWrapperActive]: active,
          })}
        />
      </Dropdown>
    </Rnd>
  );
};

export default connect((state: any) => ({
  selectedId: state.editor.selectedId,
  board: state.editor.board,
}))(DragResizeItem);