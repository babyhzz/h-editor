import styles from './index.less';
import { useState } from 'react';
import { Modal, Space } from 'antd';

interface BgPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const imgPaths = [
  './bg/bg1.jpeg',
  './bg/bg2.jpg',
  './bg/bg3.jpeg',
  './bg/bg4.jpeg',
  './bg/bg5.jpg',
];

const BgPicker: React.FC<BgPickerProps> = (props) => {
  const { value, onChange } = props;

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
      <Modal visible={visible} title="请选择背景" footer={null} width={700} onCancel={close}>
        <Space className={styles.bgList} wrap>
          {imgPaths.map((path) => (
            <img src={path} key={path} onClick={() => choose(path)} />
          ))}
        </Space>
      </Modal>
    </div>
  );
};

export default BgPicker;
