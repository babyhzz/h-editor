import { LayerConfig } from '@/layers/typing';
import { Reducer } from 'umi';
interface EditorModel {
  namespace: 'editor';
  state: {
    layers: Array<LayerConfig>;
    /** 当前选择的图层 id */
    selected: string | null;
  };
  reducers: {
    addLayer: Reducer;
  };
}

const editor: EditorModel = {
  namespace: 'editor',
  state: {
    layers: [],
    selected: null,
  },
  reducers: {
    addLayer(state, { payload }) {
      state.layers.push(payload);
      state.selected = payload.id;
    },
  },
};

export default editor;
