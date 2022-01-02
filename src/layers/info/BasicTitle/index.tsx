import { LayerConfig } from '@/layers/typing';

interface BasicTitleProps extends LayerConfig {}

const BasicTitle: React.FC<BasicTitleProps> = (props) => {
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

export default BasicTitle;
