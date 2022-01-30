import { groupBy } from 'lodash';

const componentMap: Record<string, any> = {};
const componentContext = require.context('./', true, /.tsx$/);
componentContext.keys().forEach((key) => {
  const { default: component } = componentContext(key);
  componentMap[component.name] = component;
});

const templateMap: Record<string, any> = {};
const templateContext = require.context('./', true, /\/template.ts$/);
templateContext.keys().forEach((key) => {
  const { default: template } = templateContext(key);
  templateMap[template.type] = template;
});

const templateGroup = groupBy(Object.values(templateMap), 'category');

export { componentMap, templateMap, templateGroup };
