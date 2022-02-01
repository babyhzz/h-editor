import type { LayerTemplate } from '@/layers/typing';

const TitleBg: LayerTemplate = {
  type: 'TitleBg',
  category: 'media',
  icon: 'icon-comp-BgBlock',
  name: '大标题背景',
  width: 300,
  height: 80,
  config: [
    {
      key: 'backgroundImage',
      name: '图片',
      type: 'imgPicker',
      comProps: {
        title: '请选择背景',
        modalWidth: 900,
        imgPaths: ['./titleBg/bg1.png', './bg/bg1.jpeg'],
      },
    },
  ],
};

export default TitleBg;
