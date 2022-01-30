import FormRenderer from '@/components/FormRenderer';
import type { LayerConfig, LayerViewConfig } from '@/layers/typing';
import { Divider, Tabs } from 'antd';
import React from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import DataSourceForm from './DataSourceForm';
import styles from './index.less';
import { viewConfig } from './config';

const { TabPane } = Tabs;

interface LayerConfigPanelProps {
  selectedLayer: LayerConfig;
  dispatch: Dispatch;
}

const ConfigLayerPanel: React.FC<LayerConfigPanelProps> = (props) => {
  const { selectedLayer, dispatch } = props;

  const updateView = (view: Partial<LayerViewConfig>) => {
    dispatch({
      type: 'editor/updateLayerView',
      payload: view,
    });
  };

  const handleViewChange = (values: any) => {
    updateView(values);
  };

  const handleConfigChange = (values: any) => {
    dispatch({
      type: 'editor/updateLayerConfig',
      payload: values,
    });
  };

  const handleDataSourceChange = (values: any) => {
    dispatch({
      type: 'editor/updateLayerDataSource',
      payload: values,
    });
  };

  return (
    <Tabs defaultActiveKey="1" className={styles.configTabs} tabPosition="top" animated={false}>
      <TabPane tab="配置" key="config">
        <FormRenderer
          key="view"
          config={viewConfig}
          value={selectedLayer.view}
          onChange={handleViewChange}
        />
        <Divider style={{ margin: '0 0 8px' }} />
        <FormRenderer
          key="config"
          config={selectedLayer.config}
          value={selectedLayer.configValues}
          onChange={handleConfigChange}
        />
      </TabPane>
      <TabPane tab="数据" key="data">
        <DataSourceForm value={selectedLayer.dataSource} onChange={handleDataSourceChange} />
      </TabPane>
      <TabPane tab="交互" key="event">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default connect((state: any) => {
  const { layers, selectedId } = state.editor;
  const selectedLayer = layers.find((l: LayerConfig) => l.id === selectedId);

  return { selectedLayer };
})(ConfigLayerPanel);
