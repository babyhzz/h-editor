import codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import { Controlled as CodeMirror } from 'react-codemirror2';

/**
 * CodeMirror 使用还不是很熟悉，需要了解
 * https://github.com/scniro/react-codemirror2/issues/21
 */
interface JsonInputProps {
  value?: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
}

const JsonInput: React.FC<JsonInputProps> = (props) => {
  const { value, onChange } = props;

  // const handleChange = (
  //   editor: codemirror.Editor,
  //   data: codemirror.EditorChange,
  //   value: string,
  // ) => {
  //   try {
  //     const jsonObj = JSON.parse(value);
  //     if (onChange) {
  //       onChange(jsonObj);
  //     }
  //   } finally {
  //   }
  // };

  const handleBeforeChange = (
    editor: codemirror.Editor,
    data: codemirror.EditorChange,
    value: string,
  ) => {
    let jsonObj = props.value;
    try {
      jsonObj = JSON.parse(value);
    } finally {
      if (onChange) {
        onChange(jsonObj || {});
      }
    }
  };

  return (
    <CodeMirror
      value={JSON.stringify(value, null, 2)}
      // value={JSON.stringify(value)}
      // onChange={handleChange}
      onBeforeChange={handleBeforeChange}
      options={{
        mode: 'application/json',
        lineNumbers: true,
        // lint: true,
      }}
    />
  );
};

export default JsonInput;
