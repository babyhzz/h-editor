import React, { useEffect } from 'react';
import {
  Form,
  ConfigProvider,
  Input,
  InputNumber,
  Select,
  Collapse,
} from 'antd';
import omit from 'lodash/omit';
import ColorPicker from './ColorPicker';
import styles from './index.less';

type FieldConfigType = 'text' | 'number' | 'select' | 'color';

interface FieldConfig {
  key: string;
  type: FieldConfigType;
  name: string;
  description?: string;
  default?: string | number | boolean;
  [prop: string]: any;
}

interface FieldGroupConfig extends Pick<FieldConfig, 'key' | 'name'> {
  type: 'group';
  children: Array<FieldConfig | FieldGroupConfig>;
}

export type FormConfig = Array<FieldConfig | FieldGroupConfig>;

interface FormRendererProps {
  config: FormConfig;
  values: any;
  onChange?: (values: any) => void;
}

const { Panel } = Collapse;

const FormRenderer: React.FC<FormRendererProps> = (props) => {
  const { config, values, onChange } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values]);

  const handleValuesChange = (values: any) => {
    console.log('Value Change!!', values);
    if (onChange) {
      onChange(values);
    }
  };

  const renderField = (item: FieldConfig) => {
    const comProps = omit(item, [
      'key',
      'type',
      'name',
      'description',
      'default',
    ]);

    if (item.type === 'text') {
      return (
        <Form.Item label={item.name} name={item.key}>
          <Input {...comProps} />
        </Form.Item>
      );
    }
    if (item.type === 'number') {
      return (
        <Form.Item label={item.name} name={item.key}>
          <InputNumber {...comProps} style={{ width: '100%' }} />
        </Form.Item>
      );
    }
    if (item.type === 'select') {
      return (
        <Form.Item label={item.name} name={item.key}>
          <Select {...comProps} />
        </Form.Item>
      );
    }
    if (item.type === 'color') {
      return (
        <Form.Item label={item.name} name={item.key}>
          <ColorPicker {...comProps} />
        </Form.Item>
      );
    }
  };

  const renderForm = (items: FormConfig) => {
    return items.map((item) => {
      if (item.type === 'group') {
        if (item.children && item.children.length > 0) {
          return (
            <Collapse accordion key={item.key}>
              <Panel key={item.key} header={item.name}>
                {renderForm(item.children)}
              </Panel>
            </Collapse>
          );
        }
      } else {
        return (
          <React.Fragment key={item.key}>{renderField(item)}</React.Fragment>
        );
      }
    });
  };

  return (
    <ConfigProvider componentSize="small">
      <Form
        form={form}
        onValuesChange={handleValuesChange}
        colon={false}
        className="editor-form"
        labelAlign="left"
      >
        {renderForm(config)}
      </Form>
    </ConfigProvider>
  );
};

export default FormRenderer;
