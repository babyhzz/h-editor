import type { ComponentType } from 'react';
import type { LayerTemplate } from './typing';
import BasicTitleTemplate from './info/BasicTitle/template';
import BasicTitle from './info/BasicTitle';
import BasicLineChartTemplate from './chart/BasicLineChart/template';
import BasicLineChart from './chart/BasicLineChart';

const componentMap: Record<string, ComponentType<any>> = {
  BasicTitle,
  BasicLineChart,
};

const templateMap: Record<string, LayerTemplate> = {
  BasicTitle: BasicTitleTemplate,
  BasicLineChart: BasicLineChartTemplate,
};

export { componentMap, templateMap };
