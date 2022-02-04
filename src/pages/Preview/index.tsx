import { componentMap } from '@/layers';
import type { BoardConfig, LayerConfig } from '@/layers/typing';
import { useSize } from 'ahooks';
import { useMemo } from 'react';
import { connect } from 'umi';
import styles from './index.less';

interface PreviewProps {
  board: BoardConfig;
  layers: LayerConfig[];
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { board, layers } = props;

  const size = useSize(document.body);

  const scale = useMemo(() => {
    if (!board || !size) {
      return { w: 1, h: 1 };
    }

    return { w: size.width / board.width, h: size.height / board.height };
  }, [size, board]);

  return (
    <div
      style={{
        width: board.width,
        height: board.height,
        backgroundImage: `url(${board?.backgroundImage})`,
        transform: `scale(${scale.w}, ${scale.h})`,
      }}
      className={styles.board}
    >
      {layers.map((layer) => {
        const DynamicComponent = componentMap[layer.type];
        const { view } = layer;

        return (
          <div
            key={layer.id}
            style={{
              position: 'absolute',
              left: view.x,
              top: view.y,
              width: view.width,
              height: view.height,
              opacity: view.opacity,
            }}
          >
            <DynamicComponent {...layer} board={board} />
          </div>
        );
      })}
    </div>
  );
};

export default connect((state: any) => ({
  layers: state.editor.layers,
  board: state.editor.board,
}))(Preview);
