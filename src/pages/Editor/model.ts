import { LayerConfig } from '@/layers/typing';

interface EditorModel {
  namespace: 'editor';
  state: {
    layers: Array<LayerConfig> | null;
    // 当前选择的图层 id
    selected: string | null;
  };
}

const editor: EditorModel = {
  namespace: 'editor',
  state: {
    layers: null,
    selected: null,
  },
};

export default editor;
