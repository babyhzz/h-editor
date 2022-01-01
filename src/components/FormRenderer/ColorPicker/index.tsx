import { HexColorInput } from 'react-colorful';

interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { value, onChange, ...rest } = props;

  const handleChange = (color: string) => {
    if (onChange) {
      onChange(color);
    }
  };

  return <HexColorInput color={value} onChange={handleChange} {...rest} />;
};

export default ColorPicker;
