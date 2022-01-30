import { componentMap } from '@/layers';
import type { BoardConfig, LayerConfig } from '@/layers/typing';
import { connect } from 'umi';

interface PreviewProps {
  board: BoardConfig;
  layers: LayerConfig[];
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { board, layers } = props;

  return (
    <div
      style={{
        width: board?.width,
        height: board?.height,
        backgroundImage: `url(${board?.backgroundImage})`,
        position: 'relative',
      }}
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
            <DynamicComponent {...layer} />
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
