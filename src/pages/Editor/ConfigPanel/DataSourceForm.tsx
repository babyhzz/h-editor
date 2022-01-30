import type { DataField, DataSource } from '@/layers/typing';
import { Table, Form, Input, Radio, ConfigProvider } from 'antd';
import JsonInput from '@/components/form/JsonInput';
import { useEffect } from 'react';

const { Column } = Table;

interface DataSourceFormProps {
  dataFields: DataField[] | undefined;
  value: DataSource;
  onChange: (values: any) => void;
}

const DataSourceForm: React.FC<DataSourceFormProps> = (props) => {
  const { dataFields, onChange, value } = props;

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
        onValuesChange={handleChange}
        form={form}
        initialValues={{
          apiMethod: 'get',
        }}
      >
        {dataFields && (
          <Table dataSource={dataFields} pagination={false} rowKey="key">
            <Column title="字段" dataIndex="key" />
            <Column
              title="映射"
              dataIndex="dcKey"
              render={(_, item: any) => (
                <Form.Item name={['dcFields', item.key]} noStyle>
                  <Input />
                </Form.Item>
              )}
            />
          </Table>
        )}

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
            <JsonInput />
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
    </ConfigProvider>
  );
};

export default DataSourceForm;
