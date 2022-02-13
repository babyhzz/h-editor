import { interactionMap } from '@/layers-components';

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

export function getLayerPropsFromTemplate(
  e: React.DragEvent,
  template: ComponentTemplate,
  boardWidth: number,
  boardHeight: number,
): LayerProps {
  // TODO: 使用ahooks之后，之前的写法，为什么nativeEvent找不到了
  // const { offsetX, offsetY } = e.nativeEvent;
  // @ts-ignore
  const { offsetX, offsetY } = e;
  console.log(e);

  let x = offsetX - template.width / 2;

  console.log('before x: ', x);
  if (x < 0) {
    x = 0;
  } else if (x > boardWidth - template.width) {
    x = boardWidth - template.width;
  }
  console.log('after x: ', x);

  let y = offsetY - template.height / 2;
  console.log('offsetY: ', offsetY);
  console.log('before y: ', y);
  if (y < 0) {
    y = 0;
  } else if (y > boardHeight - template.height) {
    y = boardHeight - template.height;
  }
  console.log('after y: ', y);

  const comProps = getDefaultValues(template.config);

  const { data, getStaticData } = interactionMap[template.type] || {};
  let staticData = data;
  if (getStaticData) {
    staticData = getStaticData(comProps);
  }

  return {
    id: `${template.type}-${randomString()}`,
    comName: template.type,
    comProps: comProps,
    icon: template.icon,
    width: template.width,
    height: template.height,
    x: x,
    y: y,
    opacity: 1,
    name: `${template.name}-${randomString()}`,
    dataSource: {
      type: 'static',
      // data: JSON.stringify(staticData, null, 2),
      data: staticData,
    },
  };
}
