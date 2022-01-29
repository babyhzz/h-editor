import IconFont from '@/components/IconFont';
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
      <div className={styles.layerItem}>
        <div className={styles.libIconWrapper}>
          <IconFont type="icon-cat-chart" className={styles.libIcon} />
        </div>
        <span className="ellipsis" style={{ width: 110 }}>
          {layer.view.name}
        </span>
      </div>
    </div>
  );
};

export default LayerItem;
