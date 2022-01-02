import { HexColorInput, HexColorPicker } from 'react-colorful';
import styles from './index.less';
import { useRef, useState, useCallback } from 'react';
import useClickOutside from './useClickOutside';

interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { value, onChange, ...rest } = props;

  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  const handleChange = (color: string) => {
    if (onChange) {
      onChange(color);
    }
  };

  return (
    <div className={styles.picker}>
      <HexColorInput color={value} onChange={handleChange} {...rest} />
      <div
        className={styles.swatch}
        style={{ backgroundColor: value }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={value} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
