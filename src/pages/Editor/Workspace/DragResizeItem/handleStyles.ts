/** Resize按钮的尺寸大小 */
const defaultHandleSize = 6;

// const handleCommonStyle = {
//   width: handleSize,
//   height: handleSize,
//   backgroundColor: '#FFF',
//   borderRadius: '50%',
// };

export const handleStyles = (scale: number) => {
  const handleSize = defaultHandleSize / scale;

  const handleCommonStyle = {
    width: handleSize,
    height: handleSize,
    backgroundColor: '#FFF',
    borderRadius: '50%',
  };

  return {
    topLeft: {
      ...handleCommonStyle,
      left: -handleSize / 2,
      top: -handleSize / 2,
      cursor: 'nwse-resize',
    },
    topRight: {
      ...handleCommonStyle,
      right: -handleSize / 2,
      top: -handleSize / 2,
      cursor: 'nesw-resize',
    },
    bottomLeft: {
      ...handleCommonStyle,
      left: -handleSize / 2,
      bottom: -handleSize / 2,
      cursor: 'nesw-resize',
    },
    bottomRight: {
      ...handleCommonStyle,
      right: -handleSize / 2,
      bottom: -handleSize / 2,
      cursor: 'nwse-resize',
    },
    top: {
      ...handleCommonStyle,
      left: `calc(50% - ${handleSize / 2}px)`,
      top: -handleSize / 2,
      cursor: 'ns-resize',
    },
    bottom: {
      ...handleCommonStyle,
      left: `calc(50% - ${handleSize / 2}px)`,
      bottom: -handleSize / 2,
      cursor: 'ns-resize',
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
      cursor: 'e-resize',
    },
  };
};
