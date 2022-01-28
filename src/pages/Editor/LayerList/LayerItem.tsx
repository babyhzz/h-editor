import type { LayerConfig } from '@/layers/typing';
import classNames from 'classnames';
import styles from './index.less';

interface LayerItemProps {
  layer: LayerConfig;
  className: string | undefined;
  onClick: (layer: LayerConfig) => void;
}

const LayerItem: React.FC<LayerItemProps> = (props) => {
  const { layer, className, onClick } = props;

  return (
    <div className={classNames(className, styles.layerWrapper)} onClick={() => onClick(layer)}>
      <div className={styles.layerItem}>{layer.alias}</div>
    </div>
  );
};

export default LayerItem;
