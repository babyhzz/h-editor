import type { BoardConfig, LayerConfig } from '@/layers/typing';
import type { Reducer, Subscription } from 'umi';
import { merge } from 'lodash';
interface EditorModel {
  namespace: 'editor';
  state: {
    layers: LayerConfig[];
    /** 当前选择的图层 id */
    selected: string | null;
    board: BoardConfig | null;
  };
  reducers: {
    addLayer: Reducer;
    selectLayer: Reducer;
    updateLayerView: Reducer;
    updateLayerConfig: Reducer;
    updateLayerDataSource: Reducer;
    initBoard: Reducer;
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
    initBoard(state, { payload }) {
      state.board = payload;
    },
    addLayer(state, { payload }) {
      state.layers.push(payload);
      state.selected = payload.id;
    },
    selectLayer(state, { payload }) {
      state.selected = payload;
    },
    updateLayerView(state, { payload }) {
      const { view } = payload;
      const layer = state.layers.find((l: any) => l.id === state.selected);
      layer.view = { ...layer.view, ...view };
    },
    updateLayerConfig(state, { payload }) {
      const layer = state.layers.find((l: any) => l.id === state.selected);
      layer.configValues = { ...layer.configValues, ...payload };
    },
    updateLayerDataSource(state, { payload }) {
      const layer = state.layers.find((l: any) => l.id === state.selected);
      layer.dataSource = merge(layer.dataSource, payload);
      console.log('layer.dataSource:', layer.dataSource);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('doing setup');
    },
  },
};

export default editor;
