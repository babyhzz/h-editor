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

const interactionMap: Record<string, any> = {};
const interactionContext = require.context('./', true, /\/interaction.ts$/);
interactionContext.keys().forEach((key) => {
  const { type, ...rest } = interactionContext(key);
  interactionMap[type] = rest;
});

export { componentMap, templateMap, templateGroup, interactionMap };
