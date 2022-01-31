import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/zh-cn';
interface JsonInputProps {
  value?: any;
  onChange?: (value: any) => void;
}

/**
 * https://github.com/AndrewRedican/react-json-editor-ajrm
 */
const JsonInput: React.FC<JsonInputProps> = (props) => {
  const { value, onChange } = props;

  function handleContentChange(content: any) {
    const { jsObject, error } = content;
    if (onChange && !error) {
      onChange(jsObject);
    }
  }

  console.log('value:', value);
  return <JSONInput locale={locale} placeholder={value} onChange={handleContentChange} />;
};

export default JsonInput;
