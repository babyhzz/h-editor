import React, { useEffect, useState } from 'react';
import type { FormItemProps } from 'antd';
import { Space } from 'antd';
import { Tabs } from 'antd';
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
  Slider,
} from 'antd';
import { ColorPicker, BgPicker } from '@/components/form';
import styles from './index.less';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

type DefaultValue = string | number | boolean | any[];

type FieldConfigType =
  | 'text'
  | 'number'
  | 'select'
  | 'color'
  | 'radioButton'
  | 'switch'
  | 'bgPicker'
  | 'slider'
  /** 配置项的集合，放在一栏显示，可能是不同的属性，也有可能是控制同一属性 */
  | 'suit'
  /** 用于折叠款的属性，折叠款仅用于归类 */
  | 'none'
  /** 数组类型的配置 */
  | 'array';

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
const { TabPane } = Tabs;

const itemKey = (item: FieldConfig) => `${item.key}-${item.type}`;

const FormRenderer: React.FC<FormRendererProps> = (props) => {
  const { config, value, onChange } = props;

  // 保存当前每个折叠元素的折叠状态
  const [collapseKeyMap, setCollapseKeyMap] = useState<Record<string, string>>({});

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [form, value]);

  const handleValuesChange = (values: any) => {
    if (onChange) {
      onChange(values);
      console.log('values change!', values);
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
      component && (
        // 防止collapse panel中的switch点击事件穿透
        <div onClick={(e) => e.stopPropagation()}>
          {<Form.Item {...formItemProps}>{component}</Form.Item>}
        </div>
      )
    );
  };

  const handleCollapseChange = (item: FieldConfig, activeKey: string) => {
    setCollapseKeyMap({
      ...collapseKeyMap,
      [itemKey(item)]: activeKey,
    });
  };

  const renderArray = (item: FieldGroupConfig) => {
    return (
      <Form.List name={item.key}>
        {(fields, { add, remove }) => {
          const handleAdd = (e: React.MouseEvent) => {
            e.stopPropagation();
            add({});
          };
          return (
            <Collapse accordion key={itemKey(item)}>
              <Panel
                key={itemKey(item)}
                header={item.name}
                extra={
                  <Space>
                    <PlusOutlined key="add" onClick={handleAdd} />
                    <DeleteOutlined key="delete" />
                  </Space>
                }
              >
                <Tabs className={styles.arrayTabs}>
                  {fields.map((field) => (
                    <TabPane key={field.key} tab={`${item.name}${field.key + 1}`}>
                      {item.children.map((childItem) =>
                        renderField(childItem, {
                          ...field,
                          name: [field.name, childItem.key],
                        }),
                      )}
                    </TabPane>
                  ))}
                </Tabs>
              </Panel>
            </Collapse>
          );
        }}
      </Form.List>
    );
  };

  const renderForm = (items: FormConfig) => {
    return items.map((item) => {
      if ('children' in item && item.children.length > 0) {
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

        if (item.type === 'array') {
          return renderArray(item);
        }

        // 针对 switch 和 none，switch带disable功能，none为普通折叠器
        const editable = item.type === 'switch' && !value[item.key] ? false : true;

        return (
          <Collapse
            accordion
            key={itemKey(item)}
            activeKey={editable ? collapseKeyMap[itemKey(item)] : []}
            collapsible={editable ? undefined : 'disabled'}
            onChange={(key: any) => handleCollapseChange(item, key)}
          >
            <Panel
              key={itemKey(item)}
              header={item.name}
              extra={renderField(item, { noStyle: true })}
            >
              {renderForm(item.children)}
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
