import FormRenderer from '@/components/FormRenderer';
import type { BoardConfig } from '@/layers/typing';
import type { Dispatch } from 'umi';
import React from 'react';
import { connect } from 'umi';
import { boardConfig } from './config';
import styles from './index.less';

interface ConfigBoardPanelProps {
  board: BoardConfig;
  dispatch: Dispatch;
}

const ConfigBoardPanel: React.FC<ConfigBoardPanelProps> = (props) => {
  const { board, dispatch } = props;

  const handleBoardChange = (values: Partial<BoardConfig>) => {
    dispatch({ type: 'editor/updateBoard', payload: values });
  };

  return (
    <div>
      <div className={styles.boardConfigHeader}>看板设置</div>
      <FormRenderer key="view" config={boardConfig} value={board} onChange={handleBoardChange} />
    </div>
  );
};

export default connect((state: any) => ({
  board: state.editor.board,
}))(ConfigBoardPanel);
