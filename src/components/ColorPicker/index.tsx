import RcColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import styles from './index.less';

interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { value, onChange, ...rest } = props;

  const handleColorChange = ({ color }) => {
    if (onChange) {
      onChange(color);
    }
  };

  return (
    <div className={styles.colorPicker}>
      <RcColorPicker color={value} onChange={handleColorChange} {...rest} />
    </div>
  );
};

export default ColorPicker;
