import { FormConfig } from '@/components/FormRenderer';

interface Field {
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

  dataFields?: Array<Field>;

  events?: any;
}

interface StaticDataSource {
  type: 'static';
  data: any;
}

interface ApiDataSource {
  api: string;
  apiMethod: 'get' | 'post';
  apiHeaders: string;
  apiBody: string;
}

export interface LayerConfig extends LayerTemplate {
  /** 组件id，一个看板内唯一 */
  id: string;
  alias: string;
  configValues: any;
  /** 字段映射 */
  dcFields?: Record<string, string>;

  view: {
    w: number;
    h: number;
    x: number;
    y: number;
    opacity: number;
  };

  dataSource: StaticDataSource | ApiDataSource;
}
