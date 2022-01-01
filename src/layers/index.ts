import { ComponentType } from 'react';
import BasicTitleTemplate from './text/BasicTitle/template';
import BasicTitle from './text/BasicTitle';
import { LayerTemplate } from './typing';

const componentMap: Record<string, ComponentType<any>> = {
  BasicTitle: BasicTitle,
};

const templateMap: Record<string, LayerTemplate> = {
  BasicTitle: BasicTitleTemplate,
};

export { componentMap, templateMap };
