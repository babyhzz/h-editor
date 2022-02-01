import type { FormConfig } from '@/components/FormRenderer';

export const viewConfig: FormConfig = [
  {
    key: 'name',
    name: '图层名称',
    type: 'text',
  },
  {
    key: 'size',
    name: '尺寸位置',
    type: 'suit',
    children: [
      {
        key: 'width',
        name: '宽度',
        type: 'number',
        comProps: {
          suffix: 'px',
        },
      },
      {
        key: 'height',
        name: '高度',
        type: 'number',
        comProps: {
          suffix: 'px',
        },
      },
      {
        key: 'x',
        name: 'x坐标',
        type: 'number',
        comProps: {
          suffix: 'px',
        },
      },
      {
        key: 'y',
        name: 'y坐标',
        type: 'number',
        comProps: {
          suffix: 'px',
        },
      },
    ],
  },
  {
    key: 'opacity',
    name: '不透明度',
    type: 'same',
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
          suffix: 'px',
        },
      },
      {
        key: 'height',
        name: '高度',
        type: 'number',
        default: 1080,
        comProps: {
          suffix: 'px',
        },
      },
    ],
  },
  {
    key: 'backgroundImage',
    name: '背景图',
    type: 'imgPicker',
    comProps: {
      title: '请选择背景',
      modalWidth: 900,
      imgPaths: ['./bg/bg1.jpeg', './bg/bg2.jpg', './bg/bg3.jpeg', './bg/bg4.jpeg', './bg/bg5.jpg'],
    },
  },
];
