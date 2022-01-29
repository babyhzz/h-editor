import { BgPicker, ColorPicker } from '@/components/form';
import IconFont from '@/components/IconFont';
import { useMap } from 'ahooks';
import type { FormItemProps } from 'antd';
import {
  Col,
  Collapse,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Tabs,
} from 'antd';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

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
  const [, { set: setCollapseKey, get: getCollapseKey }] = useMap<string, string>();

  // 保存每个tab激活key的状态，fieldKey，会递增
  // const [tabActiveKeyMap, setTabActiveKeyMap] = useState<Record<string, string>>({});
  const [, { set: setTabActiveKey, get: getTabActiveKey }] = useMap<string, string>();

  const tabFieldsMap = useRef<Record<string, any>>({});

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [form, value]);

  const handleValuesChange = (_: any, values: any) => {
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
    setCollapseKey(item.key, activeKey);
  };

  const renderArray = (item: FieldGroupConfig) => {
    return (
      <Form.List name={item.key}>
        {(fields, { add, remove }) => {
          tabFieldsMap.current = {
            ...tabFieldsMap.current,
            [item.key]: fields,
          };
          const handleAdd = (e: React.MouseEvent) => {
            e.stopPropagation();
            add({});
            // 选中最新的tab项
            setTimeout(() => {
              const itemFields = tabFieldsMap.current[item.key];
              setTabActiveKey(item.key, itemFields[itemFields.length - 1].key + '');
            }, 0);
          };
          const handleRemove = (e: React.MouseEvent) => {
            e.stopPropagation();
            const itemFields = tabFieldsMap.current[item.key];
            if (itemFields && itemFields.length > 1) {
              const targetField = tabFieldsMap.current[item.key].find(
                (field: any) => getTabActiveKey(item.key) === field.key + '',
              );
              remove(targetField.name);
              // 选择第一个
              setTimeout(() => {
                setTabActiveKey(item.key, tabFieldsMap.current[item.key][0].key + '');
              }, 0);
            } else {
              message.error('无法删除，至少保留一个序列');
            }
          };
          return (
            <Collapse accordion key={itemKey(item)}>
              <Panel
                key={itemKey(item)}
                header={item.name}
                extra={
                  <Space size="middle" className={styles.arrayActionIcon}>
                    <IconFont key="add" type="icon-add-square" onClick={handleAdd} />
                    <IconFont key="delete" type="icon-delete" onClick={handleRemove} />
                  </Space>
                }
              >
                <Tabs
                  className={styles.arrayTabs}
                  activeKey={getTabActiveKey(item.key)}
                  onChange={(activeKey) => setTabActiveKey(item.key, activeKey)}
                >
                  {fields.map((field) => (
                    <TabPane key={field.key} tab={`${item.name}${field.name + 1}`}>
                      {item.children.map((childItem) => (
                        <div key={itemKey(childItem)}>
                          {renderField(childItem, {
                            ...field,
                            name: [field.name, childItem.key],
                          })}
                        </div>
                      ))}
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
    const renderItem = (item: FormItem) => {
      if ('children' in item && item.children.length > 0) {
        if (item.type === 'suit') {
          return (
            <Form.Item label={item.name}>
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
            activeKey={editable ? getCollapseKey(item.key) : []}
            collapsible={editable ? undefined : 'disabled'}
            onChange={(key: any) => handleCollapseChange(item, key)}
          >
            <Panel key={item.key} header={item.name} extra={renderField(item, { noStyle: true })}>
              {renderForm(item.children)}
            </Panel>
          </Collapse>
        );
      } else {
        return renderField(item);
      }
    };
    return items.map((item) => <div key={itemKey(item)}>{renderItem(item)}</div>);
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
