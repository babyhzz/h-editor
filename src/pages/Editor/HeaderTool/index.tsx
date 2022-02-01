import SwitchButton, { IconButton } from '@/components/SwitchButton';
import type { BoardConfig } from '@/layers/typing';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Space, Slider } from 'antd';
import { round } from 'lodash';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import styles from './index.less';

interface HeaderToolProps {
  showLayerList: boolean;
  showConfigPanel: boolean;
  showLibs: boolean;
  board: BoardConfig;
  dispatch: Dispatch;
}

const HeaderTool: React.FC<HeaderToolProps> = (props) => {
  const { showLayerList, showConfigPanel, showLibs, board, dispatch } = props;

  const dispatchConfig = (typeName: string, value: boolean) => {
    dispatch({
      type: `editor/${typeName}`,
      payload: value,
    });
  };

  const handleScaleChange = (value: number) => {
    dispatch({ type: 'editor/updateBoard', payload: { scale: round(value / 100, 2) } });
  };

  const handleScaleStepChange = (value: number) => {
    let scale = board.scale * 100 + value;
    if (scale < 0) {
      scale = 0;
    }
    if (scale > 100) {
      scale = 100;
    }
    dispatch({ type: 'editor/updateBoard', payload: { scale: round(scale / 100, 2) } });
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
          <div className={styles.scale}>
            <span style={{ width: 30 }}>{round(board.scale * 100, 0)}%</span>
            <MinusOutlined onClick={() => handleScaleStepChange(-5)} />
            <Slider value={board.scale * 100} onChange={handleScaleChange} />
            <PlusOutlined onClick={() => handleScaleStepChange(5)} />
          </div>
        </Space>
      </div>
      <div className={styles.publishRegion}>
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
  board: state.editor.board,
  showLayerList: state.editor.showLayerList,
  showConfigPanel: state.editor.showConfigPanel,
  showLibs: state.editor.showLibs,
}))(HeaderTool);
