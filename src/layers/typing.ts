import { FormConfig } from '@/components/FormRenderer';
import { ReactNode } from 'react';

export interface DataField {
  key: string;
  description: string;
}

export interface LayerTemplate {
  /** 唯一确定组件 */
  type: string;

  name: string;

  thumbnail?: string;

  width: number;

  height: number;

  config: FormConfig;

  dataTemplate?: any;

  dataFields?: DataField[];

  events?: any;
}

interface StaticDataSource {
  type: 'static';
  data: string;
  dcFields: Record<string, string>;
}

interface ApiDataSource {
  type: 'api';
  apiUrl: string;
  apiMethod: 'get' | 'post';
  apiHeaders: string;
  /** API参数，可能是params也可能是body */
  apiData: string;
  /** 字段映射 */
  dcFields: Record<string, string>;
  /** 刷新的秒数 */
  refreshInterval: number;
}
export type DataSource = StaticDataSource | ApiDataSource;

export interface LayerViewConfig {
  width: number;
  height: number;
  x: number;
  y: number;
  opacity: number;
}
export interface LayerConfig extends LayerTemplate {
  /** 组件id，一个看板内唯一 */
  id: string;
  alias: string;
  configValues: any;
  view: LayerViewConfig;
  dataSource: DataSource;
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
}

interface BigBoard {
  name: string;
  thumbnail?: string;
  config: BoardConfig;
  layers: Array<LayerConfig>;
}
