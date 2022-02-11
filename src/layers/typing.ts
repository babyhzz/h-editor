import type { FormConfig } from '@/components/FormRenderer';

export type LayerCategory = 'info' | 'chart' | 'media';

export interface DataField {
  key: string;
  description: string;
}

export interface LayerTemplate {
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
export type DataSource = StaticDataSource | ApiDataSource;

export interface LayerViewConfig {
  /** 图层名称 */
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  opacity: number;
}
export interface LayerConfig {
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
  // configValues: any;
  // view: LayerViewConfig;
  dataSource: DataSource;
}

export interface ComponentConfig extends LayerConfig {
  board: BoardConfig;
}

export enum DisplayMode {
  FULL_SCREEN = 1,
  FIT_WIDTH = 2,
  FIT_HEIGHT = 3,
}

export interface BoardConfig {
  width: number;
  height: number;
  grid: number;
  display: DisplayMode;
  backgroundColor?: string;
  backgroundImage?: string;
  scale: number;
  commonHeaders: Record<string, any>;
}

interface BigBoard {
  name: string;
  thumbnail?: string;
  config: BoardConfig;
  layers: LayerConfig[];
}
