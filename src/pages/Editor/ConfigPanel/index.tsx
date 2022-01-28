import type { LayerConfig } from '@/layers/typing';
import { connect } from 'umi';
import ConfigBoardPanel from './ConfigBoardPanel';
import ConfigLayerPanel from './ConfigLayerPanel';

interface ConfigPanelProps {
  selectedLayer: LayerConfig | null;
}

const ConfigPanel: React.FC<ConfigPanelProps> = (props) => {
  const { selectedLayer } = props;
  return <>{selectedLayer ? <ConfigLayerPanel /> : <ConfigBoardPanel />}</>;
};

export default connect((state: any) => {
  const { layers, selectedId } = state.editor;
  const selectedLayer = layers.find((l: LayerConfig) => l.id === selectedId);

  return { selectedLayer };
})(ConfigPanel);
