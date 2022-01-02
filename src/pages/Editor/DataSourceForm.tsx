import { LayerConfig } from '@/layers/typing';
import { Table, Form, Input } from 'antd';
const { Column } = Table;

interface DataSourceFormProps extends LayerConfig {
  onChange: (values: any) => void;
}

const DataSourceForm: React.FC<DataSourceFormProps> = (props) => {
  const { dataFields, onChange } = props;

  const handleChange = (values: any) => {
    console.log(values);
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Form onValuesChange={handleChange}>
      <Table
        dataSource={dataFields}
        pagination={false}
        rowKey="key"
        size="small"
      >
        <Column title="字段" dataIndex="key" />
        <Column
          title="映射"
          dataIndex="dcKey"
          render={(_, item: any) => (
            <Form.Item name={item.key} noStyle>
              <Input size="small" />
            </Form.Item>
          )}
        />
      </Table>
    </Form>
  );
};

export default DataSourceForm;
