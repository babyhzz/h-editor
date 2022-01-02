import { ComponentType } from 'react';
import BasicTitleTemplate from './info/BasicTitle/template';
import BasicTitle from './info/BasicTitle';
import { LayerTemplate } from './typing';

const componentMap: Record<string, ComponentType<any>> = {
  BasicTitle: BasicTitle,
};

const templateMap: Record<string, LayerTemplate> = {
  BasicTitle: BasicTitleTemplate,
};

export { componentMap, templateMap };
