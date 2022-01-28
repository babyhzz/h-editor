import type { LayerConfig } from '@/layers/typing';
import classNames from 'classnames';
import { connect } from 'umi';
import styles from './index.less';

interface LayerListProps {
  selectedId: string | null;
  layers: LayerConfig[];
}

const LayerList: React.FC<LayerListProps> = (props) => {
  const { layers, selectedId } = props;

  return (
    <>
      {layers.map((layer) => (
        <div
          key={layer.id}
          className={classNames({
            [styles.active]: layer.id === selectedId,
          })}
        >
          {layer.alias}
        </div>
      ))}
    </>
  );
};

export default connect((state: any) => ({
  layers: state.editor.layers,
  selectedId: state.editor.selectedId,
}))(LayerList);
