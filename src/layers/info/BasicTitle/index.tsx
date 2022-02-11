import type { LayerConfig } from '@/layers/typing';

const BasicTitle: React.FC<LayerConfig> = (props) => {
  const { width, height, comProps } = props;

  return (
    <div
      style={{
        width,
        height,
        lineHeight: height + 'px',
        backgroundColor: comProps.backgroundColor,
        fontSize: comProps.fontSize,
        fontWeight: comProps.fontWeight,
        color: comProps.fontColor,
        textAlign: comProps.textAlign,
        borderRadius: comProps.borderRadius,
        borderWidth: comProps.borderWidth,
        borderStyle: comProps.borderStyle,
        borderColor: comProps.borderColor,
        overflow: 'hidden',
      }}
    >
      {comProps.text}
    </div>
  );
};

BasicTitle.displayName = 'BasicTitle';

export default BasicTitle;
