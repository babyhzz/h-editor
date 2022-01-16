import React, { useEffect } from 'react';
import { Form, ConfigProvider, Input, InputNumber, Select, Collapse, Radio, Switch } from 'antd';
import omit from 'lodash/omit';
import ColorPicker from '@/components/ColorPicker';
import styles from './index.less';
import BgPicker from '../BgPicker';

type FieldConfigType =
  | 'text'
  | 'number'
  | 'select'
  | 'color'
  | 'radioButton'
  | 'switch'
  | 'bgPicker'
  | 'empty';

interface FieldConfig {
  key: string;
  type: FieldConfigType;
  name: string;
  description?: string;
  default?: string | number | boolean;
  [prop: string]: any;
  children?: FieldConfig[];
}

export type FormConfig = FieldConfig[];

interface FormRendererProps {
  config: FormConfig;
  value: any;
  onChange?: (values: any) => void;
}

const { Panel } = Collapse;

const FormRenderer: React.FC<FormRendererProps> = (props) => {
  const { config, value, onChange } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [form, value]);

  const handleValuesChange = (values: any) => {
    if (onChange) {
      onChange(values);
    }
  };

  const renderField = (item: FieldConfig, withLabel = true) => {
    const comProps = omit(item, ['key', 'type', 'name', 'description', 'default']);
    const label = withLabel ? item.name : '';

    let formItem = null;
    if (item.type === 'text') {
      formItem = (
        <Form.Item label={label} name={item.key}>
          <Input {...comProps} />
        </Form.Item>
      );
    }
    if (item.type === 'number') {
      formItem = (
        <Form.Item label={label} name={item.key}>
          <InputNumber {...comProps} style={{ width: '100%' }} />
        </Form.Item>
      );
    }
    if (item.type === 'select') {
      formItem = (
        <Form.Item label={label} name={item.key}>
          <Select {...comProps} />
        </Form.Item>
      );
    }
    if (item.type === 'color') {
      formItem = (
        // <Form.Item label={label} name={item.key} valuePropName="color">
        <Form.Item label={label} name={item.key}>
          <ColorPicker {...comProps} />
        </Form.Item>
      );
    }
    if (item.type === 'radioButton') {
      formItem = (
        <Form.Item label={label} name={item.key}>
          <Radio.Group {...comProps} optionType="button" />
        </Form.Item>
      );
    }
    if (item.type === 'switch') {
      formItem = (
        <Form.Item label={label} name={item.key} valuePropName="checked">
          <Switch {...comProps} />
        </Form.Item>
      );
    }
    if (item.type === 'bgPicker') {
      formItem = (
        <Form.Item label={label} name={item.key}>
          <BgPicker {...comProps} />
        </Form.Item>
      );
    }

    // 防止collapse panel中的switch点击事件穿透
    return <div onClick={(e) => e.stopPropagation()}>{formItem}</div>;
  };

  const renderForm = (items: FormConfig) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        const editable = value[item.key];

        return (
          <Collapse
            accordion
            key={item.key}
            // activeKey={editable ? item.key : undefined}
            collapsible={editable ? undefined : 'disabled'}
          >
            <Panel key={item.key} header={item.name} extra={renderField(item, false)}>
              {editable && renderForm(item.children)}
            </Panel>
          </Collapse>
        );
      } else {
        return <div key={item.key}>{renderField(item)}</div>;
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
