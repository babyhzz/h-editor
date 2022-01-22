import type { FormConfig } from '@/components/FormRenderer';
import type { LayerConfig, LayerTemplate } from '@/layers/typing';
import type { DragEvent } from 'react';

function randomString() {
  return Math.random().toString(36).substring(9);
}

function getDefaultValues(config: FormConfig): Record<string, any> {
  return config.reduce((preValues, item) => {
    if ('children' in item && item.children.length > 0) {
      return { ...preValues, [item.key]: item.default, ...getDefaultValues(item.children) };
    } else {
      return { ...preValues, [item.key]: item.default };
    }
  }, {});
}

export function getLayerConfigFromTemplate(template: LayerTemplate, e: DragEvent): LayerConfig {
  const { offsetX, offsetY } = e.nativeEvent;
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
];

export const boardConfig: FormConfig = [
  {
    key: 'width',
    name: '大屏宽度',
    type: 'number',
    default: 1920,
  },
  {
    key: 'height',
    name: '大屏高度',
    type: 'number',
    default: 1080,
    comProps: {
      addonAfter: 'px',
    },
  },
  {
    key: 'backgroundImage',
    name: '背景图',
    type: 'bgPicker',
  },
];
