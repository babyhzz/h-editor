import { componentMap } from '@/layers';
import type { LayerViewConfig } from '@/layers/typing';
import type { LayerConfig } from '@/layers/typing';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import type { DraggableData, Position } from 'react-rnd';
import { Rnd } from 'react-rnd';
import type { Dispatch } from 'umi';
import styles from './index.less';
import { handleStyles } from './handleStyles';
import { Menu, Dropdown } from 'antd';

interface DragResizeItemProps {
  layer: LayerConfig;
  active: boolean;
  scale: number;
  dispatch: Dispatch;
}

const DragResizeItem: React.FC<DragResizeItemProps> = ({ layer, active, scale, dispatch }) => {
  const {
    id,
    type,
    view: { width, height, opacity, x, y },
  } = layer;

  const DynamicComponent = useMemo(() => componentMap[type], [type]);

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
    updateView({ x: data.x, y: data.y });
  };

  const handleRndResize = (ref: HTMLElement, position: Position) => {
    updateView({
      x: position.x,
      y: position.y,
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
      resizeHandleStyles={handleStyles}
      enableResizing={active}
      scale={scale}
    >
      <DynamicComponent {...layer} />
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

export default DragResizeItem;