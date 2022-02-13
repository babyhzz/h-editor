import { connect } from 'umi';
import ConfigBoardPanel from './ConfigBoardPanel';
import ConfigLayerPanel from './ConfigLayerPanel';

interface ConfigPanelProps {
  selectedLayer: LayerProps | null;
}

const ConfigPanel: React.FC<ConfigPanelProps> = (props) => {
  const { selectedLayer } = props;
  return <>{selectedLayer ? <ConfigLayerPanel /> : <ConfigBoardPanel />}</>;
};

export default connect((state: any) => {
  const { layers, selectedId } = state.editor;
  const selectedLayer = layers.find((l: LayerProps) => l.id === selectedId);

  return { selectedLayer };
})(ConfigPanel);
