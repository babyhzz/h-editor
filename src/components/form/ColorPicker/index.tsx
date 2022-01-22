import RcColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import styles from './index.less';
import colorString from 'color-string';
import { useEffect, useState } from 'react';

interface ColorPickerProps {
  /**
   * value为#rgba格式
   */
  value?: string;
  onChange?: (value: string) => void;
}

function toHex(num: number) {
  return Math.floor(num).toString(16);
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { value, onChange, ...rest } = props;
  const [innerColor, setInnerColor] = useState({
    color: '#FFF',
    alpha: 100,
  });

  const handleColorChange = ({ color, alpha }: any) => {
    if (onChange) {
      onChange(color + toHex((alpha / 100) * 255));
    }
  };

  useEffect(() => {
    if (value) {
      console.log('color value:', value);
      const parsedColor = colorString.get(value);
      console.log('color parsed value:', value);
      const [r, g, b, a] = parsedColor.value;
      setInnerColor({
        color: `#${toHex(r)}${toHex(g)}${toHex(b)}`,
        alpha: a * 100,
      });
    }
  }, [value]);

  return (
    <div className={styles.colorPicker}>
      <RcColorPicker {...innerColor} onChange={handleColorChange} {...rest} />
    </div>
  );
};

export default ColorPicker;
