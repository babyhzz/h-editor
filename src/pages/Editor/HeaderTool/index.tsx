import SwitchButton, { IconButton } from '@/components/SwitchButton';
import { Space } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import styles from './index.less';

interface HeaderToolProps {
  showLayerList: boolean;
  showConfigPanel: boolean;
  showLibs: boolean;
  dispatch: Dispatch;
}

const HeaderTool: React.FC<HeaderToolProps> = (props) => {
  const { showLayerList, showConfigPanel, showLibs, dispatch } = props;

  const dispatchConfig = (typeName: string, value: boolean) => {
    dispatch({
      type: `editor/${typeName}`,
      payload: value,
    });
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.switchRegion}>
        <Space>
          <SwitchButton
            iconType="icon-layers"
            value={showLayerList}
            onChange={(value) => dispatchConfig('toggleLayerList', value)}
          />
          <SwitchButton
            iconType="icon-libs"
            value={showLibs}
            onChange={(value) => dispatchConfig('toggleLibs', value)}
          />
          <SwitchButton
            iconType="icon-config"
            value={showConfigPanel}
            onChange={(value) => dispatchConfig('toggleConfigPanel', value)}
          />
        </Space>
      </div>
      <div className={styles.boardRegion}>
        <Space>
          <IconButton
            iconType="icon-preview"
            title="预览"
            onClick={() => {
              window.open('/preview');
            }}
          />
          <IconButton iconType="icon-publish" title="发布" />
        </Space>
      </div>
    </div>
  );
};

export default connect((state: any) => ({
  showLayerList: state.editor.showLayerList,
  showConfigPanel: state.editor.showConfigPanel,
  showLibs: state.editor.showLibs,
}))(HeaderTool);
