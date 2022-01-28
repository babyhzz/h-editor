import type { LayerConfig } from '@/layers/typing';

interface LayerItemProps {
  layer: LayerConfig;
  className: string | undefined;
}

const LayerItem: React.FC<LayerItemProps> = (props) => {
  const { layer, className } = props;

  return <div className={className}>{layer.alias + layer.id}</div>;
};

export default LayerItem;
