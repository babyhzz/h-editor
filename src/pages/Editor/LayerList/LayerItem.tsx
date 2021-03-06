import IconFont from '@/components/IconFont';
import classNames from 'classnames';
import styles from './index.less';

interface LayerItemProps {
  layer: LayerProps;
  className: string | undefined;
  onClick: (layer: LayerProps) => void;
}

const LayerItem: React.FC<LayerItemProps> = (props) => {
  const { layer, className, onClick } = props;

  return (
    <div className={classNames(className, styles.layerWrapper)} onClick={() => onClick(layer)}>
      <div className={styles.layerItem}>
        <div className={styles.libIconWrapper}>
          <IconFont type={layer.icon} className={styles.libIcon} />
        </div>
        <span className="ellipsis" style={{ width: 110 }}>
          {layer.name}
        </span>
      </div>
    </div>
  );
};

export default LayerItem;
