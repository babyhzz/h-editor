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
    console.log('jsObject');
    if (onChange && !error) {
      onChange(jsObject);
    }
  }

  return (
    <JSONInput
      locale={locale}
      placeholder={value}
      onChange={handleContentChange}
      height={height}
      width="100%"
    />
  );
};

export default JsonInput;
