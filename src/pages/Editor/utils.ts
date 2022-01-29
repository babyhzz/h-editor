import type { FormConfig } from '@/components/FormRenderer';
import type { LayerConfig, LayerTemplate } from '@/layers/typing';

function randomString() {
  return Math.random().toString(36).substring(8);
}

function getDefaultValues(config: FormConfig): Record<string, any> {
  return config.reduce((preValues, item) => {
    if ('children' in item && item.children.length > 0) {
      // array 类型值为数组
      if (item.type === 'array') {
        return { ...preValues, [item.key]: [getDefaultValues(item.children)] };
      }
      return { ...preValues, [item.key]: item.default, ...getDefaultValues(item.children) };
    } else {
      return { ...preValues, [item.key]: item.default };
    }
  }, {});
}

export function getLayerConfigFromTemplate(
  e: React.DragEvent,
  template: LayerTemplate,
  boardWidth: number,
  boardHeight: number,
): LayerConfig {
  // TODO: 使用ahooks之后，之前的写法，为什么nativeEvent找不到了
  // const { offsetX, offsetY } = e.nativeEvent;
  // @ts-ignore
  const { offsetX, offsetY } = e;

  let x = offsetX - template.width / 2;
  if (x < 0) {
    x = 0;
  } else if (x > boardWidth - template.width) {
    x = boardWidth - template.width;
  }

  let y = offsetY - template.height / 2;
  if (y < 0) {
    y = 0;
  } else if (y > boardHeight - template.height) {
    y = boardHeight - template.height;
  }

  return {
    id: `${template.type}-${randomString()}`,
    type: template.type,
    view: {
      width: template.width,
      height: template.height,
      x: x,
      y: y,
      opacity: 1,
    },
    config: template.config,
    configValues: getDefaultValues(template.config),
    alias: `${template.name}-${randomString()}`,
    dataSource: {
      type: 'static',
      data: JSON.stringify(template.dataTemplate, null, 2),
      dcFields: {},
    },
    dataFields: template.dataFields,
  };
}
