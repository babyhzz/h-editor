import type { FormConfig } from '@/components/FormRenderer';
import type { LayerConfig, LayerTemplate } from '@/layers/typing';

function randomString() {
  return Math.random().toString(36).substring(9);
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
  template: LayerTemplate,
  e: React.DragEvent,
): LayerConfig {
  // TODO: 使用ahooks之后，之前的写法，为什么nativeEvent找不到了
  // const { offsetX, offsetY } = e.nativeEvent;
  // @ts-ignore
  const { offsetX, offsetY } = e;
  return {
    ...template,
    id: `${template.type}-${randomString()}`,
    view: {
      width: template.width,
      height: template.height,
      x: offsetX - template.width / 2,
      y: offsetY - template.height / 2,
      opacity: 1,
    },
    configValues: getDefaultValues(template.config),
    alias: template.name,
    dataSource: {
      type: 'static',
      data: JSON.stringify(template.dataTemplate, null, 2),
      dcFields: {},
    },
  };
}

export const viewConfig: FormConfig = [
  {
    key: 'size',
    name: '组件尺寸',
    type: 'suit',
    children: [
      {
        key: 'width',
        name: '宽度',
        type: 'number',
        comProps: {
          addonAfter: 'px',
        },
      },
      {
        key: 'height',
        name: '高度',
        type: 'number',
        comProps: {
          addonAfter: 'px',
        },
      },
    ],
  },
  {
    key: 'position',
    name: '组件坐标',
    type: 'suit',
    children: [
      {
        key: 'x',
        name: 'x坐标',
        type: 'number',
        comProps: {
          addonAfter: 'px',
        },
      },
      {
        key: 'y',
        name: 'y坐标',
        type: 'number',
        comProps: {
          addonAfter: 'px',
        },
      },
    ],
  },
  {
    key: 'opacity',
    name: '不透明度',
    type: 'suit',
    children: [
      {
        key: 'opacity',
        name: '不透明度',
        type: 'slider',
        comProps: {
          min: 0,
          max: 1,
          step: 0.01,
        },
      },
      {
        key: 'opacity',
        name: '不透明度',
        type: 'number',
        comProps: {
          min: 0,
          max: 1,
          step: 0.05,
        },
      },
    ],
  },
];

export const boardConfig: FormConfig = [
  {
    key: 'size',
    name: '大屏尺寸',
    type: 'suit',
    children: [
      {
        key: 'width',
        name: '宽度',
        type: 'number',
        default: 1920,
        comProps: {
          addonAfter: 'px',
        },
      },
      {
        key: 'height',
        name: '高度',
        type: 'number',
        default: 1080,
        comProps: {
          addonAfter: 'px',
        },
      },
    ],
  },
  {
    key: 'backgroundImage',
    name: '背景图',
    type: 'bgPicker',
  },
];
