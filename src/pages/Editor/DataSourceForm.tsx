import { DataField, DataSource, LayerConfig } from '@/layers/typing';
import { Table, Form, Input, Radio, ConfigProvider } from 'antd';
import JsonInput from '@/components/JsonInput';
import { useEffect } from 'react';

const { Column } = Table;

interface DataSourceFormProps {
  dataFields: Array<DataField> | undefined;
  value: DataSource;
  onChange: (values: any) => void;
}

const DataSourceForm: React.FC<DataSourceFormProps> = (props) => {
  const { dataFields, onChange, value } = props;

  const [form] = Form.useForm();

  console.log('DataSourceForm,', value);

  useEffect(() => {
    form.setFieldsValue(value);
  }, [value]);

  const handleChange = (values: any) => {
    console.log(values);
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <ConfigProvider componentSize="small">
      <Form onValuesChange={handleChange} form={form}>
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
      </Form>
    </ConfigProvider>
  );
};

export default DataSourceForm;
