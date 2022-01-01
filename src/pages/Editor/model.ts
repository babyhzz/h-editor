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
    selectLayer: Reducer;
    updateLayerView: Reducer;
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
    selectLayer(state, { payload }) {
      state.selected = payload;
    },
    updateLayerView(state, { payload }) {
      const { id, view } = payload;
      const layer = state.layers.find((l: any) => l.id === payload.id);
      layer.view = view;
      state.selected = id;
    },
  },
};

export default editor;
