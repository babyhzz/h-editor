import { BoardConfig, LayerConfig } from '@/layers/typing';
import { Reducer, Subscription } from 'umi';
interface EditorModel {
  namespace: 'editor';
  state: {
    layers: Array<LayerConfig>;
    /** 当前选择的图层 id */
    selected: string | null;
    board: BoardConfig | null;
  };
  reducers: {
    addLayer: Reducer;
    selectLayer: Reducer;
    updateLayerView: Reducer;
    updateLayerConfig: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const editor: EditorModel = {
  namespace: 'editor',
  state: {
    layers: [],
    selected: null,
    board: null,
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
      layer.view = { ...layer.view, ...view };
      state.selected = id;
    },
    updateLayerConfig(state, { payload }) {
      const layer = state.layers.find((l: any) => l.id === state.selected);
      layer.configValues = { ...layer.configValues, ...payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('doing setup');
    },
  },
};

export default editor;
