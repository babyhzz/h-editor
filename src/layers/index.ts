import { ComponentType } from 'react';
import BasicTitleTemplate from './info/BasicTitle/template';
import BasicTitle from './info/BasicTitle';
import BasicLineChartTemplate from './chart/BasicLineChart/template';
import BasicLineChart from './chart/BasicLineChart';
import { LayerTemplate } from './typing';

const componentMap: Record<string, ComponentType<any>> = {
  BasicTitle,
  BasicLineChart,
};

const templateMap: Record<string, LayerTemplate> = {
  BasicTitle: BasicTitleTemplate,
  BasicLineChart: BasicLineChartTemplate,
};

export { componentMap, templateMap };
