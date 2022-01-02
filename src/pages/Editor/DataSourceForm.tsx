import { LayerConfig } from '@/layers/typing';
import { Table, Form, Input, Radio, ConfigProvider } from 'antd';
import JsonInput from '@/components/JsonInput';

const { Column } = Table;

interface DataSourceFormProps extends LayerConfig {
  onChange: (values: any) => void;
}

const DataSourceForm: React.FC<DataSourceFormProps> = (props) => {
  const { dataFields, onChange, dataSource } = props;

  // const [form] = Form.useForm();

  // useEffect(() => {
  //   form.setFieldsValue(values);
  // }, [values]);

  const handleChange = (values: any) => {
    console.log(values);
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <ConfigProvider componentSize="small">
      <Form
        onValuesChange={handleChange}
        initialValues={{
          dataSource,
        }}
      >
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
        <Form.Item label="数据源" name={['dataSource', 'type']}>
          <Radio.Group
            optionType="button"
            options={[
              { label: '静态', value: 'static' },
              { label: 'API', value: 'api' },
            ]}
          />
        </Form.Item>
        {dataSource.type === 'static' && (
          <Form.Item noStyle name={['dataSource', 'data']}>
            <JsonInput />
          </Form.Item>
        )}
      </Form>
    </ConfigProvider>
  );
};

export default DataSourceForm;
