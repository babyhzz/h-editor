declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

/******************** FormRenderer 全局类型 begin ************************/
type DefaultValue = string | number | boolean | any[];
interface FieldConfig {
  key: string;
  type: FieldConfigType;
  name: string;
  description?: string;
  default?: DefaultValue;
  comProps?: Record<string, any>;
}

type FieldConfigType =
  | 'text'
  | 'number'
  | 'select'
  | 'color'
  | 'radioButton'
  | 'switch'
  | 'imgPicker'
  | 'slider'
  | 'json'
  /** JSON弹框编辑 */
  | 'jsonButton'
  /** 配置项的集合，放在一栏显示，配置不同属性 */
  | 'suit'
  /** 配置项的集合，放在一栏显示，配置相同属性，多种配置方式 */
  | 'same'
  /** 用于折叠款的属性，折叠款仅用于归类 */
  | 'none'
  /** 数组类型的配置 */
  | 'array';

interface FieldGroupConfig extends Omit<FieldConfig, 'type'> {
  type: 'suit' | 'same' | 'none' | 'array' | 'switch';
  /** max只针对array */
  max?: number;
  children: FormItem[];
}

type FormItem = FieldGroupConfig | FieldConfig;

type FormConfig = FormItem[];
/******************** FormRenderer 自定义全局类型 end ************************/
