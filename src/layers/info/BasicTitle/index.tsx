import { LayerConfig } from '@/layers/typing';

const BasicTitle: React.FC<LayerConfig> = (props) => {
  const { view, configValues } = props;
  const { width, height } = view;

  return (
    <div
      style={{
        width,
        height,
        lineHeight: height + 'px',
        backgroundColor: configValues.backgroundColor,
        fontSize: configValues.fontSize,
        textAlign: configValues.textAlign,
        overflow: 'hidden',
      }}
    >
      {configValues.text}
    </div>
  );
};

BasicTitle.displayName = 'BasicTitle';

export default BasicTitle;
