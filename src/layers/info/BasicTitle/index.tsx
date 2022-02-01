import type { LayerConfig } from '@/layers/typing';

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
        fontWeight: configValues.fontWeight,
        color: configValues.fontColor,
        textAlign: configValues.textAlign,
        borderRadius: configValues.borderRadius,
        borderWidth: configValues.borderWidth,
        borderStyle: configValues.borderStyle,
        borderColor: configValues.borderColor,
        overflow: 'hidden',
      }}
    >
      {configValues.text}
    </div>
  );
};

BasicTitle.displayName = 'BasicTitle';

export default BasicTitle;
