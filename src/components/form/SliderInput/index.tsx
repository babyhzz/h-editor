import styles from './index.less';
import { useState } from 'react';
import { Modal, Space } from 'antd';

interface SliderInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SliderInput: React.FC<SliderInputProps> = (props) => {
  const { value, onChange } = props;

  const [visible, setVisible] = useState(false);

  const close = () => setVisible(false);

  const choose = (path: string) => {
    if (onChange) {
      onChange(path);
    }
    close();
  };

  return <div className={styles.bgPicker}></div>;
};

export default SliderInput;
