import type { FormConfig } from '@/components/FormRenderer';

/** Resize按钮的尺寸大小 */
const handleSize = 6;

const handleCommonStyle = {
  width: handleSize,
  height: handleSize,
  backgroundColor: '#2321DD',
  borderRadius: '50%',
};

export const handleStyles = {
  topLeft: {
    ...handleCommonStyle,
    left: -handleSize / 2,
    top: -handleSize / 2,
  },
  topRight: {
    ...handleCommonStyle,
    right: -handleSize / 2,
    top: -handleSize / 2,
  },
  bottomLeft: {
    ...handleCommonStyle,
    left: -handleSize / 2,
    bottom: -handleSize / 2,
  },
  bottomRight: {
    ...handleCommonStyle,
    right: -handleSize / 2,
    bottom: -handleSize / 2,
  },
  top: {
    ...handleCommonStyle,
    left: `calc(50% - ${handleSize / 2}px)`,
    top: -handleSize / 2,
    cursor: 'n-resize',
  },
  bottom: {
    ...handleCommonStyle,
    left: `calc(50% - ${handleSize / 2}px)`,
    bottom: -handleSize / 2,
    cursor: 'n-resize',
  },
  left: {
    ...handleCommonStyle,
    left: -handleSize / 2,
    top: `calc(50% - ${handleSize / 2}px)`,
    cursor: 'w-resize',
  },
  right: {
    ...handleCommonStyle,
    right: -handleSize / 2,
    top: `calc(50% - ${handleSize / 2}px)`,
    cursor: 'w-resize',
  },
};

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
