import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { omit } from 'lodash';
import styles from './index.less';

interface CustomInputNumberProps extends Omit<InputNumberProps, 'addonAfter' | 'addonBefore'> {
  suffix?: string;
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = (props) => {
  const inputNumberProps = omit(props, 'addonAfter', 'addonBefore', 'suffix');

  return (
    <div className={styles.inputWrapper}>
      <InputNumber {...inputNumberProps} addonBefore={props.suffix} />
    </div>
  );
};

export default CustomInputNumber;
