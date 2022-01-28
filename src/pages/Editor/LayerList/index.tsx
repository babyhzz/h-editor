import type { LayerConfig } from '@/layers/typing';
import classNames from 'classnames';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import styles from './index.less';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useCallback } from 'react';
import LayerItem from './LayerItem';

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
      if (destination?.index === source.index) {
        return;
      }
      dispatch({
        type: 'editor/reorderLayer',
        payload: {
          sourceIndex: source.index,
          destinationIndex: destination?.index,
        },
      });
    },
    [dispatch],
  );

  const renderDraggableList = () => {
    return layers.map((layer, index) => (
      <Draggable draggableId={layer.id} index={index} key={layer.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <LayerItem
              layer={layer}
              className={classNames({
                [styles.active]: layer.id === selectedId,
              })}
            />
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="layer-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {renderDraggableList()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default connect((state: any) => ({
  layers: state.editor.layers,
  selectedId: state.editor.selectedId,
}))(LayerList);
