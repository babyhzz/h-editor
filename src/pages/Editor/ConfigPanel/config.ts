import type { FormConfig } from '@/components/FormRenderer';

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
