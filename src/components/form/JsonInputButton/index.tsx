import { useBoolean } from 'ahooks';
import { Modal, Button } from 'antd';
import JsonInput from '../JsonInput';

interface JsonInputButtonProps {
  title?: string;
  value?: any;
  onChange?: (value: any) => void;
}

const JsonInputButton: React.FC<JsonInputButtonProps> = (props) => {
  const { title, value, onChange } = props;
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  return (
    <>
      <Button type="primary" onClick={setTrue} ghost>
        {title || '配置'}
      </Button>
      <Modal
        title={title || '配置'}
        visible={visible}
        onCancel={setFalse}
        onOk={setFalse}
        width="75%"
      >
        <JsonInput value={value} onChange={onChange} height="400px" />
      </Modal>
    </>
  );
};

export default JsonInputButton;
