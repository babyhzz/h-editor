import type { DataSource } from '@/layers/typing';
import { Form, Input, Radio, ConfigProvider } from 'antd';
import JsonInput from '@/components/form/JsonInput';
import { useEffect } from 'react';
interface DataSourceFormProps {
  value: DataSource;
  onChange: (values: any) => void;
}

const DataSourceForm: React.FC<DataSourceFormProps> = (props) => {
  const { onChange, value } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [form, value]);

  const handleChange = (values: any) => {
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <ConfigProvider componentSize="small">
      <Form
        form={form}
        colon={false}
        labelAlign="left"
        className="editor-form"
        onValuesChange={handleChange}
        initialValues={{
          apiMethod: 'get',
        }}
        style={{ height: '100%' }}
      >
        <Form.Item label="数据源" name="type">
          <Radio.Group
            optionType="button"
            options={[
              { label: '静态', value: 'static' },
              { label: 'API', value: 'api' },
            ]}
          />
        </Form.Item>
        {value.type === 'static' && (
          <Form.Item noStyle name="data">
            <JsonInput height="calc(100% - 30px)" />
          </Form.Item>
        )}
        {value.type === 'api' && (
          <>
            <Form.Item label="接口地址" name="apiUrl">
              <Input />
            </Form.Item>
            <Form.Item label="接口方式" name="apiMethod">
              <Radio.Group
                options={[
                  { value: 'get', label: 'GET' },
                  { value: 'post', label: 'POST' },
                ]}
              />
            </Form.Item>
            <Form.Item label="头部信息" name="apiHeaders">
              <JsonInput />
            </Form.Item>
            <Form.Item label="Body信息" name="apiBody">
              <JsonInput />
            </Form.Item>
          </>
        )}
      </Form>
      {/* </div> */}
    </ConfigProvider>
  );
};

export default DataSourceForm;
