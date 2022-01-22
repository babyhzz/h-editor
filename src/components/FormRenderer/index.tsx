import React, { useEffect } from 'react';
import {
  Form,
  ConfigProvider,
  Input,
  InputNumber,
  Select,
  Collapse,
  Radio,
  Switch,
  Row,
  Col,
  FormItemProps,
  Slider,
} from 'antd';
import { ColorPicker, BgPicker } from '@/components/form';
import styles from './index.less';

type DefaultValue = string | number | boolean;

type FieldConfigType =
  | 'text'
  | 'number'
  | 'select'
  | 'color'
  | 'radioButton'
  | 'switch'
  | 'bgPicker'
  | 'suit'
  | 'slider'
  | 'none';

interface FieldConfig {
  key: string;
  type: FieldConfigType;
  name: string;
  description?: string;
  default?: DefaultValue;
  comProps?: Record<string, any>;
}

interface FieldGroupConfig extends FieldConfig {
  /** 仅做两层结构 */
  children: FieldConfig[];
}

type FormItem = FieldGroupConfig | FieldConfig;

export type FormConfig = FormItem[];

interface FormRendererProps {
  config: FormConfig;
  value: any;
  onChange?: (values: any) => void;
}

const { Panel } = Collapse;

const itemKey = (item: FieldConfig) => `${item.key}-${item.type}`;

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

  const renderField = (item: FieldConfig, extraFormItemProps?: FormItemProps) => {
    const comProps = item.comProps || {};

    const formItemProps = {
      label: item.name,
      name: item.key,
      ...(extraFormItemProps || {}),
    };

    let component = null;
    if (item.type === 'text') {
      component = <Input {...comProps} />;
    }
    if (item.type === 'number') {
      component = <InputNumber {...comProps} style={{ width: '100%' }} />;
    }
    if (item.type === 'select') {
      component = <Select {...comProps} />;
    }
    if (item.type === 'color') {
      component = <ColorPicker {...comProps} />;
    }
    if (item.type === 'radioButton') {
      component = <Radio.Group {...comProps} optionType="button" />;
    }
    if (item.type === 'switch') {
      formItemProps.valuePropName = 'checked';
      component = <Switch {...comProps} />;
    }
    if (item.type === 'bgPicker') {
      component = <BgPicker {...comProps} />;
    }
    if (item.type === 'slider') {
      component = <Slider {...comProps} />;
    }

    return (
      // 防止collapse panel中的switch点击事件穿透
      <div onClick={(e) => e.stopPropagation()}>
        {<Form.Item {...formItemProps}>{component}</Form.Item>}
      </div>
    );
  };

  const renderForm = (items: FormConfig) => {
    return items.map((item) => {
      if ('children' in item && item.children.length > 0) {
        // 套件，配置属性的组合
        if (item.type === 'suit') {
          return (
            <Form.Item label={item.name} key={itemKey(item)}>
              <Row gutter={8}>
                {item.children.map((fieldItem) => (
                  <Col key={itemKey(fieldItem)} span={12}>
                    {renderField(fieldItem, { noStyle: true })}
                  </Col>
                ))}
              </Row>
            </Form.Item>
          );
        }

        const editable = item.type === 'switch' && !value[item.key] ? false : true;

        return (
          <Collapse
            accordion
            key={itemKey(item)}
            // activeKey={editable ? item.key : undefined}
            collapsible={editable ? undefined : 'disabled'}
          >
            <Panel
              key={itemKey(item)}
              header={item.name}
              extra={renderField(item, { noStyle: true })}
            >
              {editable && renderForm(item.children)}
            </Panel>
          </Collapse>
        );
      } else {
        return <div key={itemKey(item)}>{renderField(item)}</div>;
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
