import { HexColorInput, HexColorPicker } from 'react-colorful';
import styles from './index.less';
import { useRef, useState, useCallback } from 'react';
import useClickOutside from './useClickOutside';
import { throttle } from 'lodash';

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

  const handleChange = throttle((color: string) => {
    if (onChange) {
      onChange(color);
    }
  }, 100);

  return (
    <div className={styles.picker}>
      <HexColorInput color={value} onChange={handleChange} prefixed {...rest} />
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
