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

/******************** 图层和大屏全局类型 begin ************************/

type LayerCategory = 'info' | 'chart' | 'media';

type ComponentCategory = 'info' | 'chart' | 'media';

interface DataField {
  key: string;
  description: string;
}

interface ComponentTemplate {
  /** 唯一确定组件 */
  type: string;

  /** 图层类别 */
  category: LayerCategory;

  name: string;

  icon: string;

  thumbnail?: string;

  width: number;

  height: number;

  config: FormConfig;

  dataTemplate?: any;

  events?: any;
}

interface StaticDataSource {
  type: 'static';
  data: any;
}

interface ApiDataSource {
  type: 'api';
  url: string;
  method: 'get' | 'post';
  /** API Header信息 */
  headers: Record<string, string>;
  /** API参数，可能是params也可能是body */
  params: Record<string, string>;
  /** 刷新的秒数 */
  refreshInterval: number;
}
type DataSource = StaticDataSource | ApiDataSource;

interface LayerViewConfig {
  /** 图层名称 */
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  opacity: number;
}
interface LayerConfig {
  /** 组件id，一个看板内唯一 */
  id: string;
  /** 图层名称 */
  name: string;
  /** 组件Icon */
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  comName: string;
  comProps: any;
  config: FormConfig;
  dataSource: DataSource;
}

interface ComponentConfig extends LayerConfig {
  board: BoardConfig;
}

declare const enum DisplayMode {
  FULL_SCREEN = 1,
  FIT_WIDTH = 2,
  FIT_HEIGHT = 3,
}

/** 看板配置 */
interface BoardConfig {
  width: number;
  height: number;
  grid: number;
  display: DisplayMode;
  backgroundColor?: string;
  backgroundImage?: string;
  scale: number;
  dataSourceHeaders?: Record<string, string>;
}

/** 大屏配置 */
interface BigBoard extends BoardConfig {
  name: string;
  thumbnail?: string;
  layers: LayerConfig[];
}

type LayerComponent = React.FC<any>;

/******************** 图层和大屏全局类型 end ************************/
