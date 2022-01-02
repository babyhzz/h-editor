import codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import { Controlled as CodeMirror } from 'react-codemirror2';

interface JsonInputProps {
  value?: Record<string, any>;
  onChange?: (value: string) => void;
}

const JsonInput: React.FC<JsonInputProps> = (props) => {
  const { value, onChange } = props;

  const handleChange = (
    editor: codemirror.Editor,
    data: codemirror.EditorChange,
    value: string,
  ) => {
    try {
      const jsonObj = JSON.parse(value);
      if (onChange) {
        onChange(jsonObj);
      }
    } finally {
    }
  };

  // const handleBeforeChange = (
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

  return (
    <CodeMirror
      value={JSON.stringify(value)}
      onChange={handleChange}
      // onBeforeChange={handleBeforeChange}
    />
  );
};

export default JsonInput;
