import type { FormConfig } from '@/components/FormRenderer';

export const viewConfig: FormConfig = [
  {
    key: 'width',
    name: '宽度',
    type: 'number',
  },
  {
    key: 'height',
    name: '高度',
    type: 'number',
  },
  {
    key: 'x',
    name: 'x坐标',
    type: 'number',
  },
  {
    key: 'y',
    name: 'y坐标',
    type: 'number',
  },
];

export const boardConfig: FormConfig = [
  {
    key: 'width',
    name: '大屏宽度',
    type: 'number',
  },
  {
    key: 'height',
    name: '大屏高度',
    type: 'number',
    addonAfter: 'px',
  },
];
