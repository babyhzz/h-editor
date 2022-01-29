import styles from './index.less';
import { useState } from 'react';
import { Modal, Space } from 'antd';

interface BgPickerProps {
  imgPaths?: string[];
  modalWidth?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const ImgPicker: React.FC<BgPickerProps> = (props) => {
  const { value, onChange, modalWidth = 700, imgPaths = [] } = props;

  const [visible, setVisible] = useState(false);

  const close = () => setVisible(false);

  const choose = (path: string) => {
    if (onChange) {
      onChange(path);
    }
    close();
  };

  return (
    <div className={styles.bgPicker}>
      <img src={value} onClick={() => setVisible(true)} />
      <Modal visible={visible} title="请选择背景" footer={null} width={modalWidth} onCancel={close}>
        <Space className={styles.bgList} wrap>
          {imgPaths.map((path) => (
            <img src={path} key={path} onClick={() => choose(path)} />
          ))}
        </Space>
      </Modal>
    </div>
  );
};

export default ImgPicker;
