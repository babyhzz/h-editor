import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/zh-cn';
interface JsonInputProps {
  value?: any;
  onChange?: (value: any) => void;
  height?: string;
}

/**
 * https://github.com/AndrewRedican/react-json-editor-ajrm
 */
const JsonInput: React.FC<JsonInputProps> = (props) => {
  const { value, height, onChange } = props;

  function handleContentChange(content: any) {
    const { jsObject, error } = content;
    if (onChange && !error) {
      onChange(jsObject);
    }
  }

  return (
    <JSONInput locale={locale} placeholder={value} onChange={handleContentChange} height={height} />
  );
};

export default JsonInput;
