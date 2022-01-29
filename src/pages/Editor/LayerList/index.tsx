import type { LayerConfig } from '@/layers/typing';
import classNames from 'classnames';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import styles from './index.less';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useCallback } from 'react';
import LayerItem from './LayerItem';
import { reverse, cloneDeep } from 'lodash';

interface LayerListProps {
  selectedId: string | null;
  layers: LayerConfig[];
  dispatch: Dispatch;
}

const LayerList: React.FC<LayerListProps> = (props) => {
  const { layers, selectedId, dispatch } = props;
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      if (!destination?.index) {
        return;
      }

      if (destination.index === source.index) {
        return;
      }

      dispatch({
        type: 'editor/reorderLayer',
        payload: {
          sourceIndex: layers.length - 1 - source.index,
          destinationIndex: layers.length - 1 - destination.index,
        },
      });
    },
    [dispatch, layers],
  );

  const handleLayerClick = (layer: LayerConfig) => {
    dispatch({ type: 'editor/selectLayer', payload: layer });
  };

  const renderDraggableList = () => {
    const reversedLayers = reverse(cloneDeep(layers));
    return (
      <div className={styles.layerListWrapper}>
        {reversedLayers.map((layer, index) => (
          <Draggable draggableId={layer.id} index={index} key={layer.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <LayerItem
                  layer={layer}
                  className={classNames({
                    [styles.layerActive]: layer.id === selectedId,
                  })}
                  onClick={handleLayerClick}
                />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>这是什么</header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="layer-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={styles.content}>
              {renderDraggableList()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default connect((state: any) => ({
  layers: state.editor.layers,
  selectedId: state.editor.selectedId,
}))(LayerList);
