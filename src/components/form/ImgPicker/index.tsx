import styles from './index.less';
import { useState } from 'react';
import { Modal, Space } from 'antd';

interface ImgPickerProps {
  title: string;
  imgPaths?: string[];
  modalWidth?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const ImgPicker: React.FC<ImgPickerProps> = (props) => {
  const { value, onChange, title, modalWidth = 700, imgPaths = [] } = props;

  const [visible, setVisible] = useState(false);

  const close = () => setVisible(false);

  const choose = (path: string) => {
    if (onChange) {
      onChange(path);
    }
    close();
  };

  return (
    <div className={styles.imgPicker}>
      <img src={value} onClick={() => setVisible(true)} />
      <Modal visible={visible} title={title} footer={null} width={modalWidth} onCancel={close}>
        <Space className={styles.imgList} wrap>
          {imgPaths.map((path) => (
            <img src={path} key={path} onClick={() => choose(path)} />
          ))}
        </Space>
      </Modal>
    </div>
  );
};

export default ImgPicker;
