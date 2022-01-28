import type { BoardConfig, LayerConfig } from '@/layers/typing';
import type { Reducer, Subscription } from 'umi';
import { merge } from 'lodash';
interface EditorModel {
  namespace: 'editor';
  state: {
    layers: LayerConfig[];
    /** 当前选择的图层 id */
    selectedId: string | null;
    board: BoardConfig;
  };
  reducers: {
    addLayer: Reducer;
    deleteLayer: Reducer;
    selectLayer: Reducer;
    selectBoard: Reducer;
    updateLayerView: Reducer;
    updateLayerConfig: Reducer;
    updateLayerDataSource: Reducer;
    initBoard: Reducer;
    updateBoard: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const editor: EditorModel = {
  namespace: 'editor',
  state: {
    layers: [],
    selectedId: null,
    board: {} as BoardConfig,
  },
  reducers: {
    initBoard(state, { payload }) {
      state.board = payload;
    },
    addLayer(state, { payload }) {
      state.layers.push(payload);
      state.selectedId = payload.id;
    },
    deleteLayer(state, { payload }) {
      state.layers = state.layers.filter((l: any) => l.id !== payload.id);
      if (payload.id === state.selectedId) {
        state.selectedId = null;
      }
    },
    selectLayer(state, { payload }) {
      state.selectedId = payload.id;
    },
    selectBoard(state) {
      state.selectedId = null;
    },
    updateLayerView(state, { payload }) {
      const layer = state.layers.find((l: any) => l.id === state.selectedId);
      layer.view = { ...layer.view, ...payload };
    },
    updateLayerConfig(state, { payload }) {
      console.log('model values', payload);
      const layer = state.layers.find((l: any) => l.id === state.selectedId);
      layer.configValues = { ...layer.configValues, ...payload };
    },
    updateLayerDataSource(state, { payload }) {
      const layer = state.layers.find((l: any) => l.id === state.selectedId);
      layer.dataSource = merge(layer.dataSource, payload);
      console.log('layer.dataSource:', layer.dataSource);
    },
    updateBoard(state, { payload }) {
      state.board = { ...state.board, ...payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('doing setup');
    },
  },
};

export default editor;
