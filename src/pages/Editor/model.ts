import type { BoardConfig, LayerConfig } from '@/layers/typing';
import type { Reducer, Subscription } from 'umi';
import { isNil } from 'lodash';
interface EditorModel {
  namespace: 'editor';
  state: {
    layers: LayerConfig[];
    /** 当前选择的图层 id */
    selectedId: string | null;
    board: BoardConfig;

    showLayerList: boolean;
    showConfigPanel: boolean;
    showLibs: boolean;
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
    reorderLayer: Reducer;
    toggleLayerList: Reducer;
    toggleConfigPanel: Reducer;
    toggleLibs: Reducer;
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
    showLayerList: true,
    showConfigPanel: true,
    showLibs: true,
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
      Object.keys(payload).forEach((key) => {
        layer[key] = payload[key];
      });
    },
    updateLayerConfig(state, { payload }) {
      const layer = state.layers.find((l: any) => l.id === state.selectedId);
      layer.comProps = { ...layer.comProps, ...payload };
    },
    updateLayerDataSource(state, { payload }) {
      const layer = state.layers.find((l: any) => l.id === state.selectedId);
      layer.dataSource = { ...layer.dataSource, ...payload };
    },
    updateBoard(state, { payload }) {
      state.board = { ...state.board, ...payload };
    },
    reorderLayer(state, { payload }) {
      const { sourceIndex, destinationIndex } = payload;
      if (isNil(sourceIndex) || isNil(destinationIndex)) {
        return;
      }

      const result = Array.from(state.layers);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);

      state.layers = result;
    },
    toggleLayerList(state, { payload }) {
      state.showLayerList = payload;
    },
    toggleConfigPanel(state, { payload }) {
      state.showConfigPanel = payload;
    },
    toggleLibs(state, { payload }) {
      state.showLibs = payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('doing setup', dispatch, history);
    },
  },
};

export default editor;
